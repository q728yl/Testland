import {post} from "../variables/Post";
import React from "react";
import {Avatar, Box, Divider, Flex, Icon, Text, useColorModeValue} from "@chakra-ui/react";
import {BsHeart} from "react-icons/bs";
import { addComment, getCommentsByPostId } from "../services/PostService";
import { useState } from "react";
import { useEffect } from "react";
import { RollbackOutlined } from '@ant-design/icons';
import { Textarea, Button } from '@chakra-ui/react';
import { CloseButton } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";


const Comments = (props) => {
    const {postId, commentNum}=props;
    const [reply, setReply] = useState([]);
    const textColor = useColorModeValue("gray.700", "white");
    const bgModeColor = useColorModeValue("gray.100", "black");
    const commentBgColor = useColorModeValue("white", "gray.800");
    const iconColor = useColorModeValue("gray.700", "gray.200");
    const [showInputBox, setShowInputBox] = useState(false);
    const [replyText, setReplyText] = useState('');
    const user = JSON.parse(localStorage.getItem("user"));
    const [parentId, setParentId] =useState();
    const toast = useToast();

    
    useEffect(() => {
        getCommentsByPostId(postId, (data) => {
            console.log("here")
            console.log(data);
            setReply([...data]);
        });
    }, []);

    const handleReplyClick = (parentId) => {
      if (user == null) {
        toast({
          title: "Please log in first",
          status: "warning",
          duration: 3000,
          isClosable: true,
      });
      return;
      }
        setShowInputBox(true);
        setParentId(parentId);
      };
    
      const handleInputChange = (event) => {
        setReplyText(event.target.value);
      };
    
      const handleSend = () => {
        console.log("newComment");
        const newComment={
          parentId:parentId,
          userId:user.userId,
          content:replyText,
          postId:postId,
      }
      
        console.log("newComment");
        console.log(newComment);

        addComment(newComment, (data) => {
            console.log("newComment");
    console.log(newComment);
            if (data.status > 0) window.location.reload();
            else {
                toast({
                    title: data.message,
                    status: "warning",
                    duration: 3000,
                    isClosable: true,
                });
    
            }
        });

        // 将 replyText 发送到后端的逻辑
        // ...
        // 发送完成后清空输入框内容
        setReplyText('');
        // 隐藏输入框
        setShowInputBox(false);
      };



    
    

    return (
        <Box borderRadius="2xl" overflow="hidden" bg={bgModeColor} p="20px">
            <Flex>
                <Text
                    fontSize="2xl"
                    color={textColor}
                    fontWeight="bold"
                    minWidth="100%"
                >
                    {commentNum} Comments
                </Text>
               
            </Flex>
            <Button colorScheme="blue" size="sm" onClick={() => handleReplyClick(null)}>
  Comment
</Button>
            <Divider my="20px" borderWidth="1.3px"/>
            {/* 评论区展示开始 */}
            {reply.map((comment, index) => (
                <div>
                <Box
                    key={index}
                    bg={commentBgColor}
                    p="15px"
                    mb="15px"
                    pl="30px"
                    borderRadius="md"
                    boxShadow="sm"
                    color={textColor}
                >
                    <Flex justify="space-between" align="center">
                        <Flex align="center">
                            <Avatar size="sm" name={comment.username} src={comment.avatar} mr="10px"/>
                            <Text fontSize="md" fontWeight="bold" isTruncated>
                                {comment.username}
                            </Text>
                        </Flex>
                        <Box display="flex" alignItems="center" color={iconColor}>
                            <Icon as={BsHeart} w={5} h={5}/>
                            <Text fontSize="sm" ml="3px" fontWeight="bold">
                                {comment.likes}
                            </Text>
                        </Box>
                    </Flex>
                    <Text fontSize="lg" mt="10px" isTruncated>
                        {comment.content}
                    </Text>
                    <Flex justify="flex-end" mt="10px">
                        <Text fontSize="sm">{comment.commentTime}</Text>
                    </Flex>

                 <Flex justify="flex-end" mt="10px">
                 <Button colorScheme="blue" size="sm" onClick={() => handleReplyClick(comment.commentId)}>
  Reply
</Button>
        </Flex>

                </Box>
                {comment.replies &&comment.replies.length > 0 && (
                     <Box
                     ml="50px"
                 >
        <Reply comments={comment.replies} parentName={comment.username} postId={postId}/>
        </Box>
      )}
       
                </div>
            ))}
            {/* 评论区展示结束 */}
            {showInputBox && (
  <Box p="10px" bg={bgModeColor} position="fixed" bottom="0" left="0" width="100%">
    <Flex justify="flex-end" h="40px">
      <CloseButton size="sm" onClick={() => setShowInputBox(false)} />
    </Flex>
    <Flex>
    <Textarea
      value={replyText}
      onChange={handleInputChange}
      placeholder=""
      size="sm"
      resize="none"
    />
    </Flex>
    <Flex justify="flex-end" mt="10px">
      <Button colorScheme="blue" size="sm" mt="5px" onClick={handleSend}>
        Send
      </Button>
    </Flex>
  </Box>
)}
        </Box>
    );
};

export default Comments;


const Reply = (props) => {
    const textColor = useColorModeValue("gray.700", "white");
    const bgModeColor = useColorModeValue("gray.100", "black");
    const commentBgColor = useColorModeValue("white", "gray.800");
    const replyColor = useColorModeValue('blue.500', 'blue.200');
    const iconColor = useColorModeValue("gray.700", "gray.200");
    const {comments, parentName,postId}=props;
    console.log("replyyyyyyyyyyyyy");
    console.log(comments);
    const user = JSON.parse(localStorage.getItem("user"));
    const [parentId, setParentId] =useState();
    const toast = useToast();




    const [showInputBox, setShowInputBox] = useState(false);
  const [replyText, setReplyText] = useState('');

 

  if (!Array.isArray(comments)) {
    return null; // 如果 comments 不是数组，则返回 null 或其他合适的默认值
  }
  if (comments.length <= 0) return null;

  const handleReplyClick = ( parentId) => {
    setShowInputBox(true);
    setParentId(parentId);
  };

  const handleInputChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleSend = () => {
    console.log("newComment");
    const newComment={
        parentId:parentId,
        userId:user.userId,
        content:replyText,
        postId:postId,
    }
    console.log("newComment");
    console.log(newComment);

    addComment(newComment, (data) => {
        console.log("newComment");
console.log(newComment);
        if (data.status > 0) window.location.reload();
        else {
            toast({
                title: data.message,
                status: "warning",
                duration: 3000,
                isClosable: true,
            });

        }
    });

    // 将 replyText 发送到后端的逻辑
    // ...
    // 发送完成后清空输入框内容
    setReplyText('');
    // 隐藏输入框
    setShowInputBox(false);
  };

    if (comments.length <=0 ) return null;

    return (
<div>
      {comments.map((comment, index) => (
        <div key={index}>
          <Box
            key={index}
            bg={commentBgColor}
            p="15px"
            pl="30px"
            mb="15px"
            borderRadius="md"
            boxShadow="sm"
            color={textColor}
          >
            <Flex justify="space-between" align="center">
              <Flex align="center">
                <Box display="flex" alignItems="center" color={replyColor} mr="40px">
                  <RollbackOutlined style={{ fontSize: '24px', fontWeight: 'bold' }} />
                  <Text fontSize="md" fontWeight="bold" ml="5px">
                    {parentName}
                  </Text>
                </Box>
                <Avatar size="sm" name={comment.username} src={comment.avatar} mr="10px" />
                <Text fontSize="md" fontWeight="bold" isTruncated>
                  {comment.username}
                </Text>
              </Flex>
              <Box display="flex" alignItems="center" color={iconColor}>
                <Icon as={BsHeart} w={5} h={5} />
                <Text fontSize="sm" ml="3px" fontWeight="bold">
                  {comment.likes}
                </Text>
              </Box>
            </Flex>
            <Text fontSize="lg" mt="10px" isTruncated>
              {comment.content}
            </Text>
            <Flex justify="flex-end" mt="10px">
              <Text fontSize="sm">{comment.commentTime}</Text>
            </Flex>
 

                 <Flex justify="flex-end" mt="10px">
                 <Button colorScheme="blue" size="sm" onClick={() => handleReplyClick(comment.commentId)}>
  Comment
</Button>
        </Flex>
 
          </Box>
          {comment.replies && comment.replies.length > 0 && (
                     <Box
                     ml="50px"
                 >
        <Reply comments={comment.replies} parentName={comment.username} postId={postId}/>
        </Box>
      )}
        </div>
      ))}
      {showInputBox && (
  <Box p="10px" bg={bgModeColor} position="fixed" bottom="0" left="0" width="100%">
    <Flex justify="flex-end" h="40px">
      <CloseButton size="sm" onClick={() => setShowInputBox(false)} />
    </Flex>
    <Flex>
    <Textarea
      value={replyText}
      onChange={handleInputChange}
      placeholder=""
      size="sm"
      resize="none"
    />
    </Flex>
    <Flex justify="flex-end" mt="10px">
      <Button colorScheme="blue" size="sm" mt="5px" onClick={handleSend}>
        发送
      </Button>
    </Flex>
  </Box>
)}
      
    </div>

    );
}