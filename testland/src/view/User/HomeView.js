import {Flex, Grid} from "@chakra-ui/react";
import Header from "../../components/Header";
import ProblemList from "../../components/ProblemList";
import ad1 from "../../assets/img/advertisement/ad1.png";
import ad2 from "../../assets/img/advertisement/ad2.png";
import BuiltByDevelopers from "../../components/Advertisement";
import "../../css/Loading.css";
import HexagonRadarChart from "../../components/ProblemRadarChart";

const UserHomeView = () => {
    return (
        <div>
            <Header/>
            <Grid
                templateColumns={{md: "1fr", lg: "2.0fr 1.0fr"}}
                templateRows={{md: "1fr auto", lg: "1fr"}}
            >
                <Flex flexDirection='column' pt={{base: "40px", md: "60px"}} pl={{base: "120px", md: "75px"}}>
                    <BuiltByDevelopers
                        title={"Built by Developers"}
                        name={"TestLand"}
                        description={
                            "Where code evaluation becomes a poetic journey, unleashing your creativity to dance with the programming world!"
                        }
                        imageList={[
                            {src: ad1, alt: "ad1"},
                            {src: ad2, alt: "ad2"},
                            // 添加更多的图像对象，每个对象包含 src 和 alt 属性
                        ]}
                    />
                    <ProblemList/>
                </Flex>
                <Flex flexDirection='column' pt={{base: "40px", md: "60px"}} px={{base: "120px", md: "75px"}}>
                    <HexagonRadarChart/>
                </Flex>
            </Grid>
        </div>

    );
}

export default UserHomeView;
