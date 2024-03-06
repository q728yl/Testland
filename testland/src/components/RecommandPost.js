import {Flex, useColorModeValue} from "@chakra-ui/react";
import React, {useState} from "react";
import {postList} from "../variables/Post";
import RecommandPostBox from "./Box/RecommandPostBox";

function RecommandPost() {
    const [page, setPage] = useState(1);
    // const [postList, setPostList] = useState([]);
    console.log(postList);
    const textColor = useColorModeValue("gray.700", "white");
    const bgModeColor = useColorModeValue("gray.100", "black");

    // useEffect(() => {
    //   getAllPost((data) => {
    //       setPostList([...data.data]);
    //   });
    // }, []);

    const handlePageChange = (newPage) => {
        setPage(newPage);
        // 在这里处理数据获取和更新逻辑
        console.log(postList);
    };

    return (
        <Flex direction="column">


            {postList.map((post) => (
                <RecommandPostBox key={post.postId} post={post}/>
            ))}
        </Flex>
    );
}

export default RecommandPost;
