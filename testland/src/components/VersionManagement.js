import React, { useState } from "react";
import { getCodeHistory, getTestHistoryList } from "../services/TestService";
import { useEffect } from "react";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Box,
    Grid,
    Tag,
    Text,
    Flex,
    useColorModeValue,
    Table,
    Tr,
    Th,
    Tbody,
    Thead,
    Button,
    Textarea,
    Spinner
} from "@chakra-ui/react";
import VersionTableRow from "./Tables/VersionTableRow";
import { data } from "../view/User/SubmitCode";

const results = ["AC", "WA", "TLE", "MLE", "RE", "CE", "Unsafe"];

const VersionManagement = (props) => {
    const { problemId } = props;
    const userId = JSON.parse(localStorage.getItem("user")).userId;
    const [testHistoryList, setTestHistoryList] = useState();
    const [codeHistory, setCodeHistory] = useState();
    const [showCode, setShowCode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const textColor = useColorModeValue("gray.700", "white");
    const bgColor = useColorModeValue("gray.100", "gray.700");
    const captions = ["Testcase", "Result", "Score", "Time", "Memory", "Error"];
    console.log("userId" + userId);
    console.log("problemId" + problemId);
    useEffect(() => {
        getTestHistoryList(userId, problemId, (data) => {
            console.log(data);
            if (data.status > 0 && data.data) {
                setTestHistoryList(data.data);
            } else if(data.message === "Evaluating...") {
                setTestHistoryList(null);
                setIsLoading(true);
            }
            else setTestHistoryList(null);
        });
    }, []);

    console.log("testHistoryList" + testHistoryList);

    function handleGetCodeHistory(userTestId) {
        getCodeHistory(userTestId, (data) => {
            console.log(data);
            if (data.status > 0 && data.data) {
                setCodeHistory(data.data);
                setShowCode(userTestId);
            } else setCodeHistory(null);
        });
        console.log(codeHistory);
    }

    useEffect(() => {
        console.log("codeHistory", codeHistory);
    }, [codeHistory]);

    if(isLoading) {
        return(
            <Flex justify="center" alignItems="center" h="300px">
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                    <Text m="40px" fontSize="2xl" color={textColor} fontWeight={"bold"}>
                        Evaluating...
                    </Text>
                </Flex>
        );
    }
    return (
        <Accordion defaultIndex={[0]} allowMultiple>
            {testHistoryList &&
                testHistoryList.map((item) => (
                    <AccordionItem key={item.userTestId}>
                        <h2>
                            <AccordionButton
                                bg={item.result === "0" ? "green.400" : "tomato"}
                            >
                                <Box as="span" flex="1" textAlign="left">
                                    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                                        <Flex direction="row" mt="10px">
                                            <Text fontSize="xl" color="white" fontWeight="bold">
                                                {item.result ? results[item.result] : "-"}
                                            </Text>
                                        </Flex>
                                        <Flex direction="row" mt="10px">
                                            <Text fontSize="md" color={textColor} mr="10px">
                                                Score
                                            </Text>
                                            <Tag size="md">{item.score ?? "-"}</Tag>
                                        </Flex>
                                        <Flex direction="row" mt="10px">
                                            <Text fontSize="md" color={textColor} mr="10px">
                                                Language
                                            </Text>
                                            <Tag size="md">{item.language ?? "-"}</Tag>
                                        </Flex>
                                        <Flex direction="row" mt="10px">
                                            <Text fontSize="md" color={textColor} mr="10px">
                                                Evaluation Time
                                            </Text>
                                            <Tag size="md">{item.timeStamp ?? "-"}</Tag>
                                        </Flex>
                                        <Button
                                            onClick={() => handleGetCodeHistory(item.userTestId)}
                                            p="20px"
                                            borderRadius="xl"
                                            bg="transparent"
                                            variant="solid"
                                            h="100px"
                                            zIndex="1"
                                        >
                                            View code
                                        </Button>
                                    </Grid>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>

                        <AccordionPanel pb={4}>
                            <Table variant="simple" color={textColor}>
                                <Thead>
                                    <Tr my=".8rem" color="gray.400">
                                        {captions.map((caption, idx) => {
                                            return <Th color="gray.400" key={idx}>{caption}</Th>;
                                        })}
                                    </Tr>
                                </Thead>

                                <Tbody>
                                    {item.userTestcases.map((testcase, index) => (
                                        <VersionTableRow
                                            key={testcase.testcaseId}
                                            testcase={testcase}
                                            index={index}
                                        />
                                    ))}
                                </Tbody>
                            </Table>

                            {showCode === item.userTestId && (
                                <Textarea
                                    value={codeHistory}
                                    onChange={(e) => setCodeHistory(e.target.value)}
                                    rows={8}
                                    placeholder="Code Details"
                                />
                            )}
                        </AccordionPanel>
                    </AccordionItem>
                ))}
        </Accordion>
    );
};

export default VersionManagement;
