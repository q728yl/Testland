import {Avatar, Badge, Button, Flex, Td, Text, Tr, useColorModeValue, Tag, Progress, Box} from "@chakra-ui/react";
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Heading } from "@chakra-ui/react";
import React, {useState, useEffect} from "react";
import {postRequest} from "../../utils/ajax";
import {DelProblem, getProblemById} from "../../services/ProblemService";
import {Dropdown} from "antd";
import axios from "axios";
import TestResultsChart from "../TestResultsChart";
import MarkdownView from 'react-showdown';

function ProblemTableRowAdmin(props) {
    const {
        problemId,
        problemTitle,
        difficulty,
        description,
        hint,
        category,
        tags,
        level,
        passRate,
        updateTime,
        date,
        handleUpdate
    } = props;
    const textColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "#1a202c");
    const colorStatus = useColorModeValue("white", "gray.400");
    const [isOpen, setIsOpen] = useState(false);
    const [problemDetails, setProblemDetails] = useState(null);

    useEffect(() => {
        if (isOpen) {
          getProblemById(problemId, (data) => {
            setProblemDetails(data.data); 
          });
        }
      }, [isOpen, problemId]);
    
      const onClose = () => {
        setIsOpen(false);
      };

    const handleClick = () => {
        console.log("clicked: ---------" + problemId + problemTitle + difficulty + description + hint + category + tags + level + passRate + updateTime + date);
        handleUpdate({problemId, problemTitle, difficulty, description, hint, tags});
    };

    function handleDelproblem() {

        DelProblem(problemId);

    }

    function handleUpdateTestCases() {
        // Create a file input element
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".zip";
        // Add an event listener to capture the selected file
        fileInput.addEventListener("change", async (event) => {
            const selectedFile = event.target.files[0];

            // Check if a file was selected
            if (!selectedFile) {
                return;
            }

            // Create a FormData object to send the file to the backend
            const formData = new FormData();
            formData.append("problemId", problemId);
            formData.append("testcases", selectedFile);

            try {
                // Send a POST request to the backend API
                const response = await axios.post("http://123.60.81.146:8080/updateTestcases", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                // Handle the response from the server here
                console.log("Test cases updated:", response.data);
                if (response.data.status === 1) {
                    alert(response.data.message);
                }
            } catch (error) {
                // Handle any errors that occur during the request
                console.error("Error updating test cases:", error);
            }
        });

        // Trigger a click event on the file input to open the file dialog
        fileInput.click();
    }


    return (
        <Tr>

            <Td>
                <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                    <Text fontSize="md" color={textColor} fontWeight="bold">
                        {problemId}
                    </Text>
                </Flex>
            </Td>

            <Td minWidth={{sm: "100x"}} pl="0px">
                <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                    <Text fontSize="md" color={textColor} fontWeight="bold">
                        {problemTitle}
                    </Text>
                </Flex>
            </Td>
            <Td>
                {tags.map((tag) => (
                    <Tag key={tag} size="sm" mr={1}>
                        {tag}
                    </Tag>
                ))}
            </Td>


            <Td>
                <Badge
                    bg={level === "0" ? "green.400" : level === "1" ? "yellow.400" : "red.400"}
                    color="white"
                    fontSize="16px"
                    p="3px 10px"
                    borderRadius="8px"
                >
                    {level === "0" ? "Easy" : level === "1" ? "Medium" : "Hard"}
                </Badge>
            </Td>

            <Td>
                <Flex direction="column">
                    <Text
                        fontSize="md"
                        color="teal.300"
                        fontWeight="bold"
                        pb=".2rem"
                    >{`${passRate.toFixed(1)}%`}</Text>
                    <Progress
                        colorScheme={passRate >= 50 ? "teal" : "cyan"}
                        size="xs"
                        value={passRate.toFixed(1)}
                        borderRadius="15px"
                    />
                </Flex>
            </Td>

            <Td>
                <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
                    {updateTime}
                </Text>
            </Td>
            <Td>
                <Button
                        p="0px"
                        bg="transparent"
                        variant="no-hover"
                        onClick={() => setIsOpen(true)}
                    >
                        <Text
                        fontSize="md"
                        color="gray.400"
                        fontWeight="bold"
                        cursor="pointer"
                        >
                        View
                        </Text>
                </Button>
                <Drawer isOpen={isOpen} onClose={onClose} size="lg">
                    <DrawerOverlay />
                    <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                            <Heading as="h2" size="lg" mb="1rem">
                                Problem details
                            </Heading>
                    </DrawerHeader>
                    <DrawerBody>
                        {problemDetails ? (
                        <div>                           
                            <Box mb="1rem">
                                <Text fontWeight="bold">Problem title:</Text>
                                <Text>{problemDetails.problemTitle}</Text>
                            </Box>
                            <Box mb="1rem">
                                <Text fontWeight="bold">Difficulty:</Text>
                                <Flex mt="10px">
                                <Badge
                    bg={problemDetails.difficulty === "0" ? "green.400" : problemDetails.difficulty === "1" ? "yellow.400" : "red.400"}
                    color="white"
                    fontSize="16px"
                    p="3px 10px"
                    borderRadius="8px"
                >
                    { problemDetails.difficulty === "0" ? "Easy" :  problemDetails.difficulty === "1" ? "Medium" : "Hard"}
                </Badge>
                </Flex>
                            </Box>
                            <Box mb="1rem">
                                <Text fontWeight="bold">Description:</Text>
                                {/* <Text>{problemDetails.description}</Text> */}
                                <MarkdownView
        markdown={problemDetails.description}
        options={{ tables: true, emoji: true }}
        />
                            </Box>
                            <Box mb="1rem">
                                <Text fontWeight="bold">Hint:</Text>
                                <Text>{problemDetails.hint}</Text>
                            </Box>
                            <Box mb="1rem">
                                <Text fontWeight="bold">Updated:</Text>
                                <Text>{problemDetails.updateTime}</Text>
                            </Box>
                            <Box mb="1rem">
                                <Text fontWeight="bold">Category:</Text>
                                <Text>{problemDetails.category}</Text>
                            </Box>
                            <Box mb="1rem">
                                <Text fontWeight="bold">Tags:</Text>
                                <Flex>
                                {problemDetails.tags.map((tag) => (
                                    <Badge key={tag.tagId} colorScheme="green" m="2px">
                                    {tag.content}
                                    </Badge>
                                ))}
                                </Flex>
                            </Box>
                            <Box mb="1rem">
                                <Text fontWeight="bold">Statistics:</Text>
                                <TestResultsChart
                                    acCount={problemDetails.acCount}
                                    waCount={problemDetails.waCount}
                                    tleCount={problemDetails.tleCount}
                                    reCount={problemDetails.reCount}
                                    mleCount={problemDetails.mleCount}
                                />
                            </Box>
                        </div>
                            ) : (
                            <p>Loading...</p>
                            )}
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>

            </Td>
            <Td>
                <Button p="0px" bg="transparent" variant="no-hover" onClick={handleDelproblem}>
                    <a>
                        <Text
                            fontSize="md"
                            color="gray.400"
                            fontWeight="bold"
                            cursor="pointer"
                        >
                            DELETE
                        </Text>
                    </a>
                </Button>

            </Td>
            <Td>
                <Button
                    p="0px"
                    bg="transparent"
                    variant="no-hover"
                    onClick={handleUpdateTestCases}
                >
                    <a>
                        <Text
                            fontSize="md"
                            color="gray.400"
                            fontWeight="bold"
                            cursor="pointer"
                        >
                            Update Testcases
                        </Text>
                    </a>
                </Button>
            </Td>

        </Tr>
    );
}

export default ProblemTableRowAdmin;
