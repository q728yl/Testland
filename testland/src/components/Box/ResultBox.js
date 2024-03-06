import React from "react";
import {Flex, Square, Text} from "@chakra-ui/react";

const results = ["AC", "WA", "TLE", "MLE", "RE", "CE"];

function ResultBox(props) {
    const {testcase, index} = props;

    return (
        <div style={{width: '250px'}}>
            <Square w="250px" h="250px" backgroundColor={testcase.result === 0 ? "green.400" : "red.500"}>
                <Flex direction="column" alignItems="center" justifyContent="center">
                    <Text fontSize="xl" color="white" fontWeight="bold">
                        Testcase {index + 1}
                    </Text>
                    <Text fontSize="6xl" color="white" fontWeight="bold">
                        {testcase.result===null ? "-":results[testcase.result]}
                    </Text>
                    <Text fontSize="3xl" color="white" fontWeight="bold">
                        {testcase.score ?? "-"}
                    </Text>
                    <Text fontSize="lg" color="white" fontWeight="bold">
                        {testcase.time ?? "-"}ms/{testcase.memory ?? "-"}B
                    </Text>
                </Flex>
            </Square>
            {/*{testcase.result !== 0 && (*/}
            {/*  <Alert status="error">*/}
            {/*    <AlertIcon />*/}
            {/*    <Text fontSize="sm" whiteSpace="pre-wrap" maxWidth="135px" overflowWrap="break-word">*/}
            {/*      {testcase.description}*/}
            {/*    </Text>*/}
            {/*  </Alert>*/}
            {/*)}*/}
        </div>
    );
}

export default ResultBox;
