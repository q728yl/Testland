import {Badge, Box, Center, Divider, Flex, Tag, Text, useColorModeValue} from "@chakra-ui/react";
import {useState} from "react";
import ReactMarkdown from 'react-markdown';
import MarkdownView from 'react-showdown';

function processString(string) {
    let processedString = string.slice(2, -1); // 去掉头尾两个 "`"
    // console.log("process1");
    // console.log(processedString)
    processedString = processedString.replace(/`/g, "\\`"); // 将所有的 "`" 替换为 "\"
    const finalString = processedString; // 添加头尾两个 "`"
    // const finalString = processedString ; // 添加头尾两个 "`"
    return finalString;
}

const ProblemInfo = (props) => {
    const {problem} = props;

    const [prcsdString, setPrscString] = useState();
    // console.log(problem.description.trim().replace(/^['"](.*)['"]$/, '$1'));

    const textColor = useColorModeValue("gray.700", "white");
    const bgModeColor = useColorModeValue("gray.100", "black");


    if (!problem) {
        return null; // 或者返回一个占位符
    }

    return (
        <Flex direction="column">
            <Text fontSize="2xl" color={textColor} fontWeight="bold">
                {problem.problemTitle}
            </Text>

            <Flex direction="row" mt='10px'>
                <Text fontSize="lg" color={textColor} mr="10px">
                    Difficulty
                </Text>

                <Badge
                    bg={
                        problem.level === 0 ? "green.400" :
                            problem.level === 1 ? "yellow.400" :
                                "red.400"
                    }
                    color="white"
                    fontSize="16px"
                    p="3px 10px"
                    borderRadius="8px"
                    mr="60px"
                >
                    {problem.level === 0 ? "Easy" : problem.level === 1 ? "Medium" : "Hard"}
                </Badge>

                <Text fontSize="lg" color={textColor} mr="10px">
                    Tags
                </Text>

                {problem.tags.map((tag) => (
                    <Tag key={tag.tagId} size="lg" mr={1}>
                        {tag.content}
                    </Tag>
                ))}
            </Flex>

            <Divider my="20px" borderWidth="1.3px"/>

            {/* <ReactMarkdown>
                {processString(problem.description)}
            </ReactMarkdown> */}
            <MarkdownView
        markdown={problem.description}
        options={{ tables: true, emoji: true }}
        />
            <Flex pt={{base: "20px", md: "30px"}} direction="column">
                {problem.examples.map((example, index) => (
                    <Box
                        key={example}
                        mb="20px"
                        bg={bgModeColor}
                        size="lg"
                        mr={1}
                        borderRadius="lg"
                        overflow="hidden"
                        p={{base: "10px", md: "15px"}}
                    >
                        <Text fontSize="md" fontWeight="bold">
                            Sample {index + 1}
                        </Text>

                        <Flex align="center">
                            {/* 嵌套的 Flex 容器 */}
                            <Text fontSize="sm" color={textColor} fontWeight="bold">
                                Input：
                            </Text>
                            <ReactMarkdown>{example.input}</ReactMarkdown>
                        </Flex>

                        <Flex align="center">
                            {/* 嵌套的 Flex 容器 */}
                            <Text fontSize="sm" color={textColor} fontWeight="bold">
                                Output：
                            </Text>
                            <ReactMarkdown>{example.output}</ReactMarkdown>
                        </Flex>

                        <Flex align="center">
                            {/* 嵌套的 Flex 容器 */}
                            <Text fontSize="sm" color={textColor} fontWeight="bold">
                                Explanation：
                            </Text>
                            <ReactMarkdown>{example.explanation}</ReactMarkdown>
                        </Flex>
                    </Box>
                ))}
            </Flex>

            <Flex direction="row">
                <Text fontSize="lg" fontWeight="bold" color={textColor} mr="10px">
                    Hint：
                </Text>
                <ReactMarkdown>{problem.hint}</ReactMarkdown>
            </Flex>

            <Divider my="10px" borderWidth="1.5px"/>

            <Flex direction="row" my='20px'>
                <Text fontSize="sm" color={textColor} mr="10px">
                    Submit：{problem.testCount}
                </Text>
                <Center height='25px' mx="20px">
                    <Divider orientation='vertical' borderWidth="1.5px"/>
                </Center>
                <Text fontSize="sm" color={textColor} mr="10px">
                    Pass：{problem.acCount}
                </Text>
            </Flex>
        </Flex>
    );
}

export default ProblemInfo;
  