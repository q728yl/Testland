import {Flex, Grid, Text, useColorModeValue} from "@chakra-ui/react";
import Header from "../../components/Header";
import {useLocation} from "react-router-dom";
import ForumInfo from "../../components/ForumInfo";
import {ChatIcon} from "@chakra-ui/icons";
import RecommandPost from "../../components/RecommandPost";
import Comments from "../../components/Comments";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const ForumDetails = () => {
    const query = useQuery();
    const postId = query.get("postId");
    console.log("hhhhhhhhhhhhhh");
    console.log(postId);
    const textColor = useColorModeValue("teal.400", "teal.200");

    return (
        <div>
            <Header/>
            <Grid
                templateColumns={{md: "1fr", lg: "2.0fr 1.0fr"}}
                templateRows={{md: "1fr auto", lg: "1fr"}}
            >
                <Flex flexDirection='column' pt={{base: "40px", md: "60px"}} pl={{base: "120px", md: "75px"}}>
                    <ForumInfo postId={postId}/>
                </Flex>
                <Flex flexDirection='column' pt={{base: "40px", md: "60px"}} px={{base: "120px", md: "75px"}}>
                    <Text fontSize="2xl" color={textColor} fontWeight={"bold"}>
                        <ChatIcon color={textColor} w={6} h={6} mr={2}/>
                        Related contents
                    </Text>
                    <RecommandPost/>
                </Flex>
            </Grid>
        </div>
    );
}

export default ForumDetails;
