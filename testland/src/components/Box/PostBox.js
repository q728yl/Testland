import React from "react";
import {Avatar, Box, Flex, Icon, Image, Spacer, Text, useColorModeValue, useStatStyles} from "@chakra-ui/react";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import {BsBookmark, BsChat, BsEye, BsHeart} from "react-icons/bs";
import {NavLink} from "react-router-dom";
import { useState } from "react";

const results = ["AC", "WA", "TLE", "MLE", "RE", "CE"];

function PostBox(props) {
    const {post} = props;
    console.log("jeoi");
    console.log(post.coverUrl);

    const textColor = useColorModeValue("gray.700", "white");
    const bgModeColor = useColorModeValue("gray.100", "black");

    // const extractText = (text, maxLines) => {
    //   const lines = text.split('\n');
    //   const truncatedText = lines.slice(0, maxLines).join('\n');
    //   // return lines.length > maxLines ? truncatedText + '...' : truncatedText;
    //   return lines.length > maxLines ? truncatedText  : truncatedText;
    // };

    // const postText = extractText(post.postText, 4);

    return (
        <NavLink to={`/forumInfo?postId=${post.postId}`}>
            <Box borderRadius="2xl" overflow="hidden" bg={bgModeColor} mb="40px">
                <Card p='1.2rem'>
                    <CardBody w='100%'>
                        <Flex flexDirection={{sm: "column", lg: "row"}} w='100%'>
                            {post.coverUrl ? (
                                <Image
                                    src={post.coverUrl}
                                    maxWidth="300px"
                                    width="100%"
                                    height="100%"
                                    borderRadius="15px"
                                    objectFit="cover"
                                    mr="20px"
                                />
                            ) : null}

                            <Flex flexDirection='column' h='100%' lineHeight='1.6' width={{lg: "100%"}} mt="10px">
                                <Flex flexDirection='row' mb="20px">
                                    <Avatar
                                        mr="20px"
                                        size={'md'}
                                        src={post.avatar ? post.avatar : 'https://avatars.dicebear.com/api/male/username.svg'}
                                    />
                                    <Text fontSize='xl' color={textColor} fontWeight='bold' pb='.5rem'>
                                        {post.title}
                                    </Text>
                                </Flex>
                                <Text fontSize='sm' color={textColor} pb='.5rem' mb="15px">
                                    {post.summary}
                                </Text>

                                <Spacer/>


                                
                            </Flex>
                        </Flex>

                    </CardBody>
                    <Flex justify="flex-end" alignSelf="flex-end" mb="20px" mr={"20px"}>
                                    <Box display="flex" alignItems="center" color="gray.500">
                                        <Icon as={BsEye} w={4} h={4} mr={1}/>
                                        <Text fontSize="sm">{post.browse}</Text>
                                    </Box>
                                    <Box display="flex" alignItems="center" color="gray.500" ml={3}>
                                        <Icon as={BsHeart} w={4} h={4} mr={1}/>
                                        <Text fontSize="sm">{post.likes}</Text>
                                    </Box>
                                    <Box display="flex" alignItems="center" color="gray.500" ml={3}>
                                        <Icon as={BsChat} w={4} h={4} mr={1}/>
                                        <Text fontSize="sm">{post.reply}</Text>
                                    </Box>
                                    <Box display="flex" alignItems="center" color="gray.500" ml={3}>
                                        <Icon as={BsBookmark} w={4} h={4} mr={1}/>
                                        <Text fontSize="sm">{post.collect}</Text>
                                    </Box>
                                    <Box display="flex" alignItems="center" color="gray.500" ml={9}>
                                        <Text fontSize="sm">{post.postTime}</Text>
                                    </Box>
                                </Flex>
                </Card>
            </Box>
        </NavLink>
    );
}

export default PostBox;
