import React from "react";
// import {post} from "../variables/Post";
// import { useQuery } from "@chakra-ui/react";
import {ReactMarkdown} from "react-markdown/lib/react-markdown";
import {Avatar, Box, Divider, Flex, Icon, Text, useColorModeValue, useStatStyles} from "@chakra-ui/react";
import {BsBookmark, BsChat, BsEye, BsHeart} from "react-icons/bs";
import { getPostByPostId } from "../services/PostService";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import MarkdownDisplay from "./Markdown/MarkDownDisplay";
import { getCommentsByPostId } from "../services/PostService";
import Comments from "./Comments";

const ForumInfo = (props) => {
    const {postId}=props;
    const [post,setPost]=useState();
    const [title,setTitle]=useState();
    const [text,setText]=useState();
    const [summary,setSummary]=useState();
    const [browse,setBrowse]=useState();
    const [likes, setLikes] = useState();
const [collect, setCollect] = useState();
const [reply, setReply] = useState([]);
const [postTime, setPostTime] = useState();
const [commentNum, setCommentNum] = useState();

    // console.log("hhhhhhhhhhhhhh");
    // console.log(postId);




        if(post==null){
            const url = `http://123.60.81.146:8080/getPostByPostId?postId=${postId}`;
          
            fetch(url)
              .then(response => response.json())
              .then(data => {
                // 处理响应数据
                console.log(data);
                setPost(data.data);
                setTitle(data.data.title);
                setSummary(data.data.summary);
                setBrowse(data.data.browse);
                setText(data.data.text);
// setReply(data.data.reply);
setCollect(data.data.collect);
setLikes(data.data.likes);
setPostTime(data.data.postTime);
setReply(data.data.reply);
setCommentNum(data.data.commentNum)
              })
              .catch(error => {
                // 处理错误
                console.error(error);
              });
            }


      

    const textColor = useColorModeValue("gray.700", "white");
    const bgModeColor = useColorModeValue("gray.100", "black");
    const iconColor = useColorModeValue("gray.700", "gray.200");

    return (
        <div>
        <Box borderRadius="2xl" overflow="hidden" bg={bgModeColor} p="40px">
            <Flex direction="column">
                <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                    {/* <Avatar src={post.avatar ? post.avatar : 'https://avatars.dicebear.com/api/male/username.svg'}
                            w="50px" borderRadius="12px" me="18px"/> */}
                              <Avatar src={'https://avatars.dicebear.com/api/male/username.svg'}
                            w="50px" borderRadius="12px" me="18px"/>
                    <Flex direction="column">
                        <Text
                            fontSize="2xl"
                            color={textColor}
                            fontWeight="bold"
                            minWidth="100%"
                        >
                            {title}
                        </Text>
                        {/* <Text fontSize="sm" color="gray.400" fontWeight="normal">
                            {post.username}
                        </Text> */}
                    </Flex>
                </Flex>
                <Divider my="20px" borderWidth="1.3px"/>
                <ReactMarkdown>{text}</ReactMarkdown>
                <Flex mb="30px"></Flex>
                <Flex align="flex-end">
                    <Box display="flex" alignItems="center" color={iconColor}>
                        <Icon as={BsEye} w={4} h={4} mr={1}/>
                        {/* <Text fontSize="sm">{post.browse}</Text> */}
                        <Text fontSize="sm">{browse}</Text>

                    </Box>
                    <Box display="flex" alignItems="center" color={iconColor} ml={3}>
                        <Icon as={BsHeart} w={4} h={4} mr={1}/>
                        <Text fontSize="sm">{likes}</Text>
                    </Box>
                    <Box display="flex" alignItems="center" color={iconColor} ml={3}>
                        <Icon as={BsChat} w={4} h={4} mr={1}/>
                        <Text fontSize="sm">{reply}</Text>
                    </Box>
                    <Box display="flex" alignItems="center" color={iconColor} ml={3}>
                        <Icon as={BsBookmark} w={4} h={4} mr={1}/>
                        <Text fontSize="sm">{collect}</Text>
                    </Box>
                    <Box display="flex" alignItems="center" color={iconColor} ml={9}>
                        <Text fontSize="sm">{postTime}</Text>
                    </Box>
                </Flex>
            </Flex>
        </Box>
                            <br/>
                            <br/>
                            <Comments postId={postId} commentNum={reply}/>
                            </div>
    )
}

export default ForumInfo;