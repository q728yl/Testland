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
    Progress
} from "@chakra-ui/react";
import React from "react";
const results = ["AC", "WA", "TLE", "MLE", "RE", "CE"];

function VersionTableRow(props) {
    const { testcase, index } = props;
    const textColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "#1a202c");
    const colorStatus = useColorModeValue("white", "gray.400");

    return (
        <Tr>

            <Td>
                <Text fontSize="sm" color={textColor}>
                    Testcase {index+1}
                </Text>
            </Td>

            <Td>
                <Text fontSize="sm" color={textColor}>
                    {testcase.result? results[testcase.result]:"-"}
                </Text>
            </Td>

            <Td>
                <Text fontSize="sm" color={textColor}>
                    {testcase.score??"-"}
                </Text>
            </Td>


            <Td>
                <Text fontSize="sm" color={textColor}>
                    {testcase.time??"-"}ms
                </Text>
            </Td>

            <Td>
                <Text fontSize="sm" color={textColor}>
                    {testcase.memory??"-"}B
                </Text>
            </Td>


            <Td>
                <Text fontSize="sm" color={textColor}>
                    {testcase.description??"-"}
                </Text>
            </Td>

        </Tr>
    );
}

export default VersionTableRow;
