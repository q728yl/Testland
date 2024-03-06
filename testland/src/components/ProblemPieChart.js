import React from "react";
import {Box, Flex, Text, useColorModeValue} from "@chakra-ui/react";
import {PieChart} from "./Charts/PieChart";

const ProblemPieChart = (props) => {
    const textColor = useColorModeValue("gray.700", "white");
    const bgModeColor = useColorModeValue("gray.100", "black");
    const {data} = props;

    // useEffect(() => {
    //     getAllProblem((data) => {
    //       setProblemData([...data.data]);
    //     });
    //   }, []);

    return (
        <Box borderRadius="2xl" bg={bgModeColor}>
            <Flex direction="column" alignItems="center" justifyContent="center">
                <Text fontSize="2xl" color={textColor} pt="60px" fontWeight="bold">
                    Evaluation Statistics
                </Text>
                {data ? (
                    <PieChart data={data}/>
                ) : (
                    <Text fontSize="lg" color={textColor} p={4}>
                        No evaluation history, you are the first one!
                    </Text>
                )}
            </Flex>
        </Box>
    );
}

export default ProblemPieChart;