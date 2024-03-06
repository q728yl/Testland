import docker



client = docker.from_env()

# client.images.build(path='e:/Code/Testland/', dockerfile='code_test_py.dockerfile', tag='code_test_py', rm=True,
#                             network_mode="host")
# client.images.build(path='e:/Code/Testland/', dockerfile='code_test_cpp.dockerfile', tag='code_test_cpp', rm=True,
#                             network_mode="host")
client.images.build(path='e:/Code/Testland/', dockerfile='code_test_java8.dockerfile', tag='code_test_java8', rm=True,
                            network_mode="host")
client.images.build(path='e:/Code/Testland/', dockerfile='code_test_java11.dockerfile', tag='code_test_java11', rm=True,
                            network_mode="host")





