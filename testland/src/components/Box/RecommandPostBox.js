import React from "react";
import {Avatar, Box, Flex, Icon, Image, Spacer, Text, useColorModeValue} from "@chakra-ui/react";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import {BsBookmark, BsChat, BsEye, BsHeart} from "react-icons/bs";
import {NavLink} from "react-router-dom";

const results = ["AC", "WA", "TLE", "MLE", "RE", "CE"];

function RecommandPostBox(props) {
    const {post} = props;
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
            <Box borderRadius="sm" overflow="hidden" bg={bgModeColor} mb="20px">
                <Card p='1.2rem'>
                    <CardBody w='100%'>
                        <Flex flexDirection={"column"} w='100%'>
                            {post.postPhoto ? (
                                <Image
                                    src={post.postPhoto}
                                    maxWidth="300px"
                                    width="100%"
                                    height="100%"
                                    borderRadius="15px"
                                    objectFit="cover"
                                    mr="20px"
                                    mb="10px"
                                />
                            ) : null}

                            <Flex flexDirection='column' h='100%' lineHeight='1.6' width={{lg: "100%"}} mt="10px">
                                <Flex flexDirection='row' mb="20px">
                                    <Avatar
                                        mr="20px"
                                        size={'sm'}
                                        src={post.avatar ? post.avatar : 'https://avatars.dicebear.com/api/male/username.svg'}
                                    />
                                    <Text fontSize='lg' color={textColor} fontWeight='bold' pb='.5rem'>
                                        {post.postTitle}
                                    </Text>
                                </Flex>
                                {/* <Text fontSize='sm' color={textColor}  pb='.5rem' mb="15px">
                  {post.postSummary}
                </Text> */}

                                <Spacer/>


                                <Flex align="flex-end">
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
                            </Flex>
                        </Flex>

                    </CardBody>

                </Card>
            </Box>
        </NavLink>
    );
}

export default RecommandPostBox;
