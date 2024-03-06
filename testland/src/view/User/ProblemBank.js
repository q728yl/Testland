import {Flex, Grid} from "@chakra-ui/react";
import Header from "../../components/Header";
import ProblemList from "../../components/ProblemList";
import HexagonRadarChart from "../../components/ProblemRadarChart";

const ProblemBank = () => {
    return (
        <div>
            <Header/>
            <Grid
                templateColumns={{md: "1fr", lg: "2.0fr 1.0fr"}}
                templateRows={{md: "1fr auto", lg: "1fr"}}
            >
                <Flex flexDirection='column' pt={{base: "40px", md: "60px"}} pl={{base: "120px", md: "75px"}}>
                    <ProblemList/>
                </Flex>
                <Flex flexDirection='column' pt={{base: "40px", md: "60px"}} px={{base: "120px", md: "75px"}}>
                    <HexagonRadarChart/>
                </Flex>
            </Grid>
        </div>
    );
}

export default ProblemBank;
