import subprocess
import sys
import getopt
import os
import resource
import json

class MemoryLimitError(Exception):
    pass

class TestCaseInfo:
    def __init__(self, time, memory, result, score):
        self.time = time
        self.memory = memory
        self.result = result
        self.score = score

def set_memory_limit(limit_in_bytes):
    soft, hard = resource.getrlimit(resource.RLIMIT_AS)
    resource.setrlimit(resource.RLIMIT_AS, (limit_in_bytes, hard))

def read_config_file(probset):
    config_file = os.path.join(probset, 'config.txt')
    with open(config_file, 'r') as f:
        lines = f.readlines()
    return lines

def parse_config_file(lines):
    full_score = 0.0
    num_testcases = int(lines[0].strip())
    testcases = []
    for line in lines[1:]:
        input_file, output_file, score = [item.strip() for item in line.strip().split(',')]
        testcases.append((input_file, output_file, float(score)))
        full_score += float(score)
    return num_testcases, testcases, full_score

def compile_cpp(submit):
    result = subprocess.run(['g++', submit, '-o', 'solution'], stdout = subprocess.PIPE, stderr = subprocess.PIPE)
    if result.returncode != 0:
        return("Compile error!")
    return("Build successfully!")

def compile_java(submit):
    result = subprocess.run(['javac', submit], stdout = subprocess.PIPE, stderr = subprocess.PIPE)
    if result.returncode != 0:
        return("Compile error!")
    return("Build successfully!")

def run_testcases(probset, submit, language, testcases):
    results = []
    for i, testcase in enumerate(testcases, start=1):
        input_file, output_file, score = testcase
        run_time = 0
        run_memory = 0
        with open(os.path.join(probset, input_file), 'r') as input_fd, open(os.path.join(probset, f'{i}.out'), 'w') as output_fd:
            try:
                limit_in_bytes = 1*1024*1024
                p = None
                if language == "python":
                    p = subprocess.Popen(['python3', submit], stdin=input_fd, stdout=output_fd, stderr=subprocess.PIPE)
                elif language == "cpp":
                    res = compile_cpp(submit)
                    if res=="Compile error!":
                        results.append(TestCaseInfo(0, 0, 5, 0.0).__dict__)
                    else:
                        p = subprocess.Popen(['./solution'], stdin=input_fd, stdout=output_fd, stderr=subprocess.PIPE)
                elif language == "java8" or language == "java11":
                    res = compile_java(submit)
                    # executable = submit.split('.')[0]
                    if res=="Compile error!":
                        results.append(TestCaseInfo(0, 0, 5, 0.0).__dict__)
                    else:
                        p = subprocess.Popen(['java', 'Main'], stdin=input_fd, stdout=output_fd, stderr=subprocess.PIPE)
                else:
                    raise ValueError("Unsupported language: " + language)
                
                if p != None:
                    try:
                        error = p.communicate(timeout=1)
                    except subprocess.TimeoutExpired:
                        p.kill()
                        raise TimeoutError("用户代码运行超时")
                    
                    if p.returncode != 0:
                        raise subprocess.CalledProcessError(p.returncode, submit)
                    
                    sys.stdin = sys.__stdin__
                    sys.stdout = sys.__stdout__
                    usage = resource.getrusage(resource.RUSAGE_CHILDREN)
                    run_memory = usage.ru_maxrss
                    run_time = str(round(usage.ru_utime * 1000, 4))
                    if usage.ru_maxrss > limit_in_bytes:
                        raise MemoryLimitError("子进程超过内存限制")
                    
                    if compare_output(os.path.join(probset, f'{i}.out'), os.path.join(probset, output_file)):
                        results.append(TestCaseInfo(run_time, run_memory, 0, score).__dict__)  # AC
                    else:
                        results.append(TestCaseInfo(run_time, run_memory, 1, 0.0).__dict__)  # WA
            except TimeoutError:
                results.append(TestCaseInfo(run_time, run_memory, 2, 0.0).__dict__)  # TLE
            except MemoryLimitError:
                results.append(TestCaseInfo(run_time, run_memory, 3, 0.0).__dict__)  # MLE
            except Exception as e:
                results.append(TestCaseInfo(run_time, run_memory, 4, 0.0).__dict__)  # RE
        os.remove(os.path.join(probset, f'{i}.out'))
    sys.stdin = sys.__stdin__
    sys.stdout = sys.__stdout__
    print(json.dumps(results))
    return results

def compare_output(file1, file2):
    with open(file1, 'r', encoding='utf-8') as f1, open(file2, 'r', encoding='utf-8') as f2:
        output_lines = [line.rstrip() for line in f1]
        ans_lines = [line.rstrip() for line in f2]
        
        # 移除末尾空行
        while output_lines and not output_lines[-1]:
            output_lines.pop()
        while ans_lines and not ans_lines[-1]:
            ans_lines.pop()
        
        return output_lines == ans_lines

def main(argv):
    probset = ''
    submit = ''
    language = ''
    try:
        opts, args = getopt.getopt(argv, "hp:c:l:")
    except getopt.GetoptError:
        print('grade.py -p <probset_path> -c <code_path> -l <language>')
        sys.exit(2)
    for opt, arg in opts:
        if opt == '-h':
            print('grade.py -p <probset_path> -c <code_path> -l <language>')
            sys.exit()
        elif opt in ("-p"):
            probset = arg
        elif opt in ("-c"):
            submit = arg
        elif opt in ("-l"):
            language = arg

    lines = read_config_file(probset)
    num_testcases, testcases, full_score = parse_config_file(lines)
    run_testcases(probset, submit, language, testcases)
    exit(0)

if __name__ == "__main__":
    main(sys.argv[1:])
