import React, {useState} from "react";
import {Button, Flex, Grid, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorModeValue} from "@chakra-ui/react";
import Header from "../../components/Header";
import HottestPostList from "../../components/HottestPostList";
import NewestPostList from "../../components/NewestPostList";
import RecommandPost from "../../components/RecommandPost";
import {NavLink} from "react-router-dom";
import {ChatIcon} from "@chakra-ui/icons";

const Forum = () => {
    const [isOpen, setIsOpen] = useState(false);
    const textColor = useColorModeValue("teal.400", "teal.200");
    const user=JSON.parse(localStorage.getItem("user"));

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <Header/>
            <Grid
                templateColumns={{md: "1fr", lg: "2.0fr 1.0fr"}}
                templateRows={{md: "1fr auto", lg: "1fr"}}
            >
                <Flex flexDirection="column" pt={{base: "40px", md: "60px"}} pl={{base: "120px", md: "75px"}}>
                    <Tabs variant="enclosed">
                        <TabList>
                            <Tab>Latest</Tab>
                            <Tab>Trending</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <HottestPostList/>
                            </TabPanel>
                            <TabPanel>
                                <NewestPostList/>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Flex>
                <Flex flexDirection="column" pt={{base: "40px", md: "60px"}} px={{base: "120px", md: "75px"}}>
                <NavLink to={user ? '/postEditor' : '#'}>
      <Button w="100%">
        {user ? '+ Post' : 'Please log in.'}
      </Button>
    </NavLink>
                    <Flex mt="20px"></Flex>
                    <Text fontSize="2xl" color={textColor} fontWeight={"bold"}>
                        <ChatIcon color={textColor} w={6} h={6} mr={2}/>
                        Recommended
                    </Text>
                    <RecommandPost/>

                </Flex>
            </Grid>

        </div>
    );
};

export default Forum;
