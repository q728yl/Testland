// Chakra imports
import {Box, Button, Flex, Icon, Image, SimpleGrid, Spacer, Text, useColorModeValue} from "@chakra-ui/react";
// Custom components
import Card from "./Card/Card.js";
import CardBody from "./Card/CardBody.js";
import React from "react";
// react icons
import {BsArrowRight} from "react-icons/bs";
import {NavLink} from "react-router-dom";

const BuiltByDevelopers = ({title, name, description, imageList}) => {
    const textColor = useColorModeValue("gray.700", "white");
    const bgModeColor = useColorModeValue("gray.100", "black");


    return (
        <Box borderRadius="2xl" overflow="hidden" bg={bgModeColor}>
            <Card minHeight='250px' p='1.2rem'>
                <CardBody w='100%'>
                    <Flex flexDirection={{sm: "column", lg: "row"}} w='100%'>
                        <Flex
                            flexDirection='column'
                            h='100%'
                            lineHeight='1.6'
                            width={{lg: "45%"}}>
                            <Text fontSize='lg' color='gray.400' fontWeight='bold'>
                                {title}
                            </Text>
                            <Text fontSize='2xl' color={textColor} fontWeight='bold' pb='.5rem'>
                                {name}
                            </Text>
                            <Text fontSize='sm' color='gray.400' fontWeight='normal'>
                                {description}
                            </Text>
                            <Spacer/>
                            <Flex align='center'>
                                <NavLink to="/forum">
                                    <Button
                                        p='0px'
                                        variant='no-hover'
                                        bg='transparent'
                                        my={{sm: "1.5rem", lg: "0px"}}>
                                        <Text
                                            fontSize='lg'
                                            color={textColor}
                                            fontWeight='bold'
                                            cursor='pointer'
                                            transition='all .5s ease'
                                            my={{sm: "1.5rem", lg: "0px"}}
                                            _hover={{me: "4px"}}>
                                            Forum
                                        </Text>
                                        <Icon
                                            as={BsArrowRight}
                                            w='20px'
                                            h='20px'
                                            fontSize='2xl'
                                            transition='all .5s ease'
                                            mx='.3rem'
                                            cursor='pointer'
                                            pt='4px'
                                            _hover={{transform: "translateX(20%)"}}
                                        />
                                    </Button>
                                </NavLink>
                            </Flex>
                        </Flex>
                        <Spacer/>
                        <SimpleGrid mt="30px" ml="20px" columns={{sm: 1, md: 2, xl: 2}}
                                    mr={{sm: "15px", md: "20px", xl: "20px"}} spacing="30px">
                            {imageList.map((image, index) => (
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    maxWidth="600px"
                                    width="100%"
                                    height="100%"
                                    borderRadius="15px"
                                    objectFit="cover"
                                />
                            ))}
                        </SimpleGrid>
                    </Flex>
                </CardBody>
            </Card>
        </Box>
    );
};

export default BuiltByDevelopers;
