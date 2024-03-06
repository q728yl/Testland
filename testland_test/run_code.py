import textwrap
import docker


class CodeTest:
    def __init__(self, dockerfile_name="new.dockerfile", image_name="docker_img"):
        self.dockerfile_name = dockerfile_name
        self.image_name = image_name

    def generate_dockerfile(self, work_dir="/home/test/", main_file="grade.py", problem_folder_path="prob1",
                            problem_folder_name="prob1", code_file="submit1.py"):
        # 生成dockerfile模板
        template = textwrap.dedent(f"""\
            FROM python:latest
            WORKDIR {work_dir}
            COPY grade.py {work_dir}
            COPY {problem_folder_path} {work_dir}{problem_folder_name}/
            COPY {code_file} {work_dir}
            CMD [ "python", "{work_dir}{main_file}", "-p", "{problem_folder_name}", "-c", "{code_file}" ]
        """)
        with open(self.dockerfile_name, "w") as f:
            f.write(template)
        print(f"dockerfile生成成功，文件名: {self.dockerfile_name}")
        return True

    def run_docker_container(self, image_name):
        client = docker.from_env()
        container = client.containers.run(image_name, detach=True)
        logs = container.logs().decode('utf-8').strip()
        container.remove()
        return logs


def main():
    image_name = 'code_test_py'
    dockerfile_path = 'code_test_py.dockerfile'
    code_test = CodeTest(dockerfile_name=dockerfile_path, image_name=image_name)
    code_test.generate_dockerfile(work_dir="/home/test/", main_file="grade.py", problem_folder_path="prob1",
                                  problem_folder_name="prob1", code_file="submit1.py")
    client = docker.from_env()
    print("正在构建docker image……")
    try:
        client.images.build(path='e:/Code/Testland/', dockerfile=dockerfile_path, tag=image_name)
    except Exception as e:
        print("构建出错，请重试！错误信息：")
        print(e)
        return
    print("docker image构建成功!")
    print("评测中，请稍候……")
    output = code_test.run_docker_container(image_name)
    print("评测结果：")
    print(output)


if __name__ == '__main__':
    main()
