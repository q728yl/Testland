import pika
import json
import docker
import os
import subprocess
import concurrent.futures
import yara

class TestResult:
    def __init__(self,userTestId, userId, problemId, codePath, language,result, score, testCaseInfo):
        self.userTestId = userTestId
        self.userId = userId
        self.problemId = problemId
        self.address = codePath
        self.language = language
        self.result = result    # 0: AC, 1: WA, 2: TLE, 3: MLE, 4: RE, 5: CE, 6: Unsafety
        self.score = score
        self.testCaseInfo = testCaseInfo

class TestCaseInfo:
    def __init__(self, time, memory, result, score):
        self.time = time
        self.memory = memory
        self.result = result
        self.score = score

def scan_file(file_path, rules_file):
    rules = yara.compile(rules_file)
    matches = rules.match(file_path)

    if matches:
        print("file is suspicious! matching rules:")
        for match in matches:
            print(f"- {match.rule}")
        return(1)
    else:
        print("file is safe.")
        return(0)

def grade_in_docker(problem_folder_path, user_code_path, language="python", grade_script_path="grade.py"):
    # 创建 Docker 客户端
    client = docker.from_env()

    user_code_file = os.path.basename(user_code_path)
    try:
        if language == "python":
            container_config = client.containers.create(
                image='code_test_py',
                command=f"python grade.py -c {user_code_file} -p problemset -l python",
                detach=True
            )
        elif language == "cpp":
            container_config = client.containers.create(
                image='code_test_cpp',
                command=f"python grade.py -c {user_code_file} -p problemset -l cpp",
                detach=True
            )
        elif language == "java8":
            container_config = client.containers.create(
                image='code_test_java8',
                command=f"python3 grade.py -c Main.java -p problemset -l java8",
                detach=True
            )
        elif language == "java11":
            container_config = client.containers.create(
                image='code_test_java11',
                command=f"python3 grade.py -c Main.java -p problemset -l java11",
                detach=True
            )
        else:
            raise ValueError("Unsupported language: " + language)
    except docker.errors.ImageNotFound:
        print("Image not found, please update image")
        return
    except ValueError:
        print("Unsupported language: " + language)
        return

    # 复制评测脚本,保证是最新版本
    subprocess.run(["docker", "cp", grade_script_path, f"{container_config.id}:/home/test/grade.py"])

    # 复制问题文件夹中的所有文件到容器内的 /home/test/problemset 目录
    subprocess.run(["docker", "cp", f"{problem_folder_path}/.", f"{container_config.id}:/home/test/problemset"])

    # 复制用户提交的代码文件到容器内的 /home/test/ 目录
    if language == "java8" or language == "java11":
        subprocess.run(["docker", "cp",user_code_path, f"{container_config.id}:/home/test/Main.java"])
    else:
        subprocess.run(["docker", "cp", user_code_path, f"{container_config.id}:/home/test/{user_code_file}"])
    # 启动容器并等待
    container_config.start()
    container_config.wait()

    # 打印容器日志
    logs = container_config.logs().decode('utf-8').strip()
    print(logs)

    # 删除容器
    container_config.remove()

    # 返回容器日志
    return logs

"""
    消费者的回调函数,处理单个评测的主体逻辑
"""
def callback(ch, method, properties, body):
    message = json.loads(body.decode())
    userId = message["userId"]
    problemId = message["problemId"]
    language = message["language"]
    codePath = message["codePath"]
    testcasesPath = message["testcasesPath"]
    userTestId = message["userTestId"]

    # 打印消息内容
    print("收到评测任务:")
    print("Test ID:", userTestId)
    print("User ID:", userId)
    print("Problem ID:", problemId)
    print("Language:", language)
    print("Code Path:", codePath)
    print("Testcases Path:", testcasesPath)
    print("")

    # 代码安全性扫描
    safety = scan_file(codePath, "./malware_detection/glue.yar")    # 这里需要替换为真实评测的代码

    if safety==0:
        # 测评代码
        testCaseInfo_str = grade_in_docker(testcasesPath,codePath,language)       # 这里需要替换为真实评测的代码
        testCaseInfo_dict = json.loads(testCaseInfo_str)
        testCaseInfo =[]
        total = 0.00
        result = 0
        for case_dict in testCaseInfo_dict:
            testCaseInfo.append(TestCaseInfo(case_dict["time"], case_dict["memory"], case_dict["result"], case_dict["score"]))
            total += float(case_dict["score"])
            if(case_dict["result"] > result):
                result = case_dict["result"]
    else:
        total = 0.00
        result = 6
        testCaseInfo =[]

    # 包装测试结果信息 
    results = TestResult(userTestId, userId, problemId, codePath, language, result, total, testCaseInfo)

    # 发送测试结果
    credentials = pika.PlainCredentials('send_result', 'send_result')
    parameters = pika.ConnectionParameters('123.60.81.146', 5672, '/', credentials)
    connection = pika.BlockingConnection(parameters)
    channel = connection.channel()
    queue = channel.queue_declare(queue='resultQueue', durable=True)
    
    channel.basic_publish(exchange='', routing_key='resultQueue', body=json.dumps(results,default=lambda o: o.__dict__))
    print(json.dumps(results,default=lambda o: o.__dict__)) 
    ch.basic_ack(delivery_tag=method.delivery_tag)


"""
    与评测消息队列进行交互的主体函数
    @param queue_name: 消息队列名称
"""
def consume(queue_name):
    # 连接到RabbitMQ服务器
    credentials = pika.PlainCredentials('admin', 'admin')
    parameters = pika.ConnectionParameters('123.60.81.146', 5672, '/', credentials)
    connection = pika.BlockingConnection(parameters)
    channel = connection.channel()

    # 设置消费者的回调函数
    channel.basic_consume(queue=queue_name, on_message_callback=callback)

    # 开始消费消息
    channel.start_consuming()


def main():
    # 消息队列
    queue_name = 'testQueue'
    num_threads = 5  # 设置消费者数量
    with concurrent.futures.ThreadPoolExecutor() as executor:
        # 提交任务给线程池并行执行
        futures = [executor.submit(consume(queue_name)) for _ in range(num_threads)]

        # 等待任务完成
        concurrent.futures.wait(futures)

    # # 测试评测用
    # print(grade_in_docker("/home/testland_data/problems/problem3", "/home/testland_data/user_code/3-3-cpp-1.cpp","cpp"))


if __name__ == '__main__': 
    main()
