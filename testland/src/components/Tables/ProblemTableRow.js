import {

    Avatar,

    Badge,

    Button,

    Flex,

    Td,

    Text,

    Tr,

    useColorModeValue,

    Tag,

    Progress, Box

} from "@chakra-ui/react";

import React, {useState} from "react";

import {postRequest} from "../../utils/ajax";

import {DelProblem} from "../../services/ProblemService";

import {message} from "antd";


function ProblemTableRow(props) {
    const {problemId, problemTitle, tags, level, passRate, updateTime, date} = props;
    const textColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "#1a202c");
    const colorStatus = useColorModeValue("white", "gray.400");

    function Details(problemId) {
        if(localStorage.getItem("user") === null){
            message.error("Please log in");
        }
        else{
            window.location = "/problemDetails/" + problemId;
        }
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

                <Button p="0px" bg="transparent" variant="no-hover"
                onClick={()=>Details(problemId)}>
                    

                        <Text

                            fontSize="md"

                            color="gray.400"

                            fontWeight="bold"

                            cursor="pointer"

                        >

                            View

                        </Text>


                </Button>


            </Td>

        </Tr>
    );
}

export default ProblemTableRow;