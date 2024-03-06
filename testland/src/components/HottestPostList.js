import {Flex} from "@chakra-ui/react";
import React, {useState} from "react";
import Pagination from "./Tables/Pagination";
import { useEffect } from "react";
// import {postList} from "../variables/Post";
import PostBox from "./Box/PostBox";
import { getPosts } from "../services/PostService";

function HottestPostList() {
    const [page, setPage] = useState(1);
    const [postList, setPostList] = useState([]);
    console.log(postList);

    useEffect(() => {
      getPosts((data) => {
          setPostList([...data.data]);
          console.log("here");
          console.log(data);
      });
    }, []);

    const handlePageChange = (newPage) => {
        setPage(newPage);
        // 在这里处理数据获取和更新逻辑
        console.log(postList);
    };

    return (
        <Flex direction="column">
            {postList.map((post) => (
                <PostBox key={post.postId} post={post}/>
            ))}
            <Pagination
                currentPage={page}
                totalPages={10}
                onPageChange={handlePageChange}
            />
        </Flex>
    );
}

export default HottestPostList;
