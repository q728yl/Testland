import React, { useEffect, useState } from "react";
import MarkDownEditor from "../../components/Markdown/MarkDownEditor";
import { ChatIcon } from "@chakra-ui/icons";
import { MastercardIcon, VisaIcon} from "../../components/Icons/Icons";
import { Flex,Grid, Button, FormControl, FormLabel, Input, Box,Icon,useToast } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import Header from "../../components/Header";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import {BsArrowRight} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import "../../css/PostEditor.css"
import "vditor/dist/index.css";
import Vditor from "vditor";
import { postGuide } from "../../variables/MarkDownText";
import axios from "axios";
import 'vditor/dist/index.css'; // 导入 Vditor 样式
import { addPost } from "../../services/PostService";
import MarkdownDisplay from "../../components/Markdown/MarkDownDisplay";
import {woshi} from "../../assets/img/postCover/我是学生.png"
const PostEditor = () => {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [coverURL, setCoverURL] = useState("");
   const [isUpLoaded,setIsUpLoaded] =useState(false);
   const user=JSON.parse(localStorage.getItem("user"));
    const [vditor, setVditor] = useState(null);
    const toast=useToast();
    const navigate = useNavigate();
    useEffect(() => {
        const vditor = new Vditor("vditor", {
            height: 750, // 设置初始高度为1200px
            mode: "sv",
            after: () => {
                vditor.setValue(postGuide); // 设置字体大小
                setVditor(vditor);
            },
        });
    }, []);

    // const handleExport = () => {
    //     if (vditor) {
    //         const text = vditor.getValue();
    //         console.log(text);
    //     }
    // };

    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
    const handleUpload = (event) => {
        setIsUpLoaded(false);
      event.preventDefault();
      const formData = new FormData();
      formData.append("file", selectedFile);
      axios.post("http://123.60.81.146:8080/uploadImage", formData).then((res) => {
        console.log(res.data.data);
        if(res.data.status>0){
        setCoverURL(res.data.data);
        setIsUpLoaded(true);}
        else {
            toast({
                title: res.data.message,
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
        }
      });
    };


    const handleSubmit = () => {
        // 处理表单提交逻辑
        console.log("Title:", title);
        console.log("Summary:", summary);
        // if (vditor) {
        //     const text = vditor.getValue();
        //     console.log(text);
        // }
        console.log("Cover:", coverURL);
        const data={
            title:title,
            summary:summary,
            coverURL:coverURL,
            text:vditor.getValue(),
            userId:user.userId,
            username:user.username,
            commentNum:0,
        }
        addPost(data,(res) => {
            console.log(res);
            if(res.status>0) {
                toast({
                    title: res.message,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                setTimeout(() => {
                    navigate('/forum');
                  }, 1000);
            }
            else{
                toast({
                    title: res.message,
                    status: "warning",
                    duration: 3000,
                    isClosable: true,
                });
            }
        });
    };

    return (
        <div>
            <Header/>
            <Grid
                templateColumns={{ md: "1fr", lg: "0.8fr 2.2fr" }}
                templateRows={{ md: "1fr auto", lg: "1fr" }}
                bg="white"
            >
             <Card p='16px' >
            <CardHeader>
                <Flex justify='space-between' flexDirection="column"  align='center' minHeight='60px' w='100%'>
                    <Button bg="teal" color='white' fontSize='2xl' variant='no-hover'>
                        Edit Post
                    </Button>
                    <FormControl pt="50px">
                            <FormLabel flexDirection="column" ms='4px' fontSize='lg' fontWeight='bold'>
                                Title
                            </FormLabel>
                            <Input
                                borderRadius='15px'
                                mb='24px'
                                fontSize='sm'
                                type='string'
                                placeholder='e.g. problem of today'
                                size='lg'
                                whiteSpace="pre-wrap"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <FormLabel ms='4px' fontSize='lg' fontWeight='bold'>
                                Brief
                            </FormLabel>
                            <Input
                                borderRadius='15px'
                                mb='36px'
                                fontSize='sm'
                                type='string'
                                placeholder='e.g. Plz study with me together!'
                                size='lg'
                                h="50px"
                                whiteSpace="pre-wrap" // 允许换行
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                            />
                            <FormLabel ms='4px' fontSize='lg' fontWeight='bold'>
                                Cover Img
                            </FormLabel>
                            <Flex>
          <Input w="80%" type="file" onChange={handleFileChange} placeholder='select file'/>
          <Button type="submit" onClick={handleUpload}>Upload</Button>
          {isUpLoaded && (
        <div className="success-indicator" marginLeft="10px">√</div>
      )}
        </Flex>
        {/* <img src="http://rxq4rgp1w.bkt.clouddn.com/wallhaven-q21drl.jpg?e=1689232936&token=x6O3yyJ1o0g9f0-WGIfdLvTMUQg9tk7MtPEqW-gR:gAKmnyEiEZQKn_CaXuJydLcpIag=" /> */}
                            <FormLabel ms='4px' fontSize='lg' fontWeight='bold'>
                                Edit the content of the post on the right.
                                <Icon
                                            as={BsArrowRight}
                                            w='20px'
                                            h='20px'
                                            fontSize='5xl'
                                            transition='all .5s ease'
                                            mx='.3rem'
                                            cursor='pointer'
                                            pt='4px'
                                            _hover={{transform: "translateX(20%)"}}
                                        />
                            </FormLabel>
                            {/* <MarkdownDisplay/> */}
                            <FormControl display='flex' alignItems='center'>              
                            </FormControl>
                        </FormControl>
                </Flex>
            </CardHeader>
            <CardBody>

            </CardBody>
        </Card>
                

            <Box w="100%">
            <Flex id="vditor" className="vditor" w={"100%"} />
            </Box>

            </Grid>

            <Flex
                style={{
                    position: "fixed",
                    bottom: "20px",
                    left: "20px",
                    display: "flex",
                }}
            >
                <Flex>
                    <NavLink to="/forum">
                        <Button
                            colorScheme="blue"
                            mr={3}
                            fontSize="lg"
                            fontWeight="bold"
                            boxShadow="lg"
                            w="200px"
                            h="50px"
                        >
                            Cancel
                        </Button>
                    </NavLink>
                    <Button
                        colorScheme="green"
                        fontSize="lg"
                        fontWeight="bold"
                        boxShadow="lg"
                        w="200px"
                        h="50px"
                        mr="20px"
                        onClick={handleSubmit}
                    >
                        Send
                    </Button>
                </Flex>
            </Flex>
        </div>
    );
};

export default PostEditor;
