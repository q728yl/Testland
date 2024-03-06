import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Switch,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import BgSignUp from "../assets/img/BgSignUp.png";

import React, {useState} from "react";
import { setSalt, register } from '../services/UserSerivce';
import { message } from "antd";
import bcrypt from 'bcryptjs'


const SignUp = () => {
    const titleColor = useColorModeValue("teal.300", "teal.200");
    const textColor = useColorModeValue("gray.700", "white");
    const bgColor = useColorModeValue("white", "gray.700");
    // const bgIcons = useColorModeValue("teal.200", "rgba(255, 255, 255, 0.5)");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            message.error("Password and confirm password do not match");
            return;
        }

        const salt = bcrypt.genSaltSync(10);

        try {
            await setSalt(username, salt);
            const hashedPassword = bcrypt.hashSync(password, salt);

            const userData = {
                username,
                hashedPassword,
                address,
                phone,
                email,
                avatar
            };
            console.log(userData);
            await register(userData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Flex
            direction='column'
            alignSelf='center'
            justifySelf='center'
            overflow='hidden'
        >
            {/* Background Image */}
            <Box
                position='absolute'
                minH={{base: "70vh", md: "50vh"}}
                w={{md: "calc(100vw - 50px)"}}
                borderRadius={{md: "15px"}}
                left='0'
                right='0'
                bgRepeat='no-repeat'
                overflow='hidden'
                zIndex='-1'
                top='0'
                bgImage={BgSignUp}
                bgSize='cover'
                mx={{md: "auto"}}
                mt={{md: "14px"}}
            ></Box>

            {/* Form */}
            <Flex
                direction='column'
                textAlign='center'
                justifyContent='center'
                align='center'
                mt='6.5rem'
                mb='30px'
            >
                <Text fontSize='4xl' color='white' fontWeight='bold'>
                    Welcome!
                </Text>
                <Text
                    fontSize='md'
                    color='white'
                    fontWeight='normal'
                    mt='10px'
                    mb='26px'
                    w={{base: "90%", sm: "60%", lg: "40%", xl: "30%"}}
                >
                    Use these awesome forms to login or create new account in your project
                    for free.
                </Text>
            </Flex>
            <Flex alignItems='center' justifyContent='center' mb='60px' mt='20px'>
                <Flex
                    direction='column'
                    w='445px'
                    background='transparent'
                    borderRadius='15px'
                    p='40px'
                    mx={{ base: "100px" }}
                    bg={bgColor}
                    boxShadow='0 20px 27px 0 rgb(0 0 0 / 5%)'
                >
                    <form onSubmit={handleSubmit}>
                        <FormControl>
                            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                                Username
                            </FormLabel>
                            <Input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                fontSize='sm'
                                ms='4px'
                                borderRadius='15px'
                                type='text'
                                placeholder='Your full name'
                                mb='24px'
                                size='lg'
                                required
                            />
                            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                                Email
                            </FormLabel>
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fontSize='sm'
                                ms='4px'
                                borderRadius='15px'
                                type='email'
                                placeholder='Your email address'
                                mb='24px'
                                size='lg'
                                required
                            />
                            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                                Password
                            </FormLabel>
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fontSize='sm'
                                ms='4px'
                                borderRadius='15px'
                                type='password'
                                placeholder='Your password'
                                mb='24px'
                                size='lg'
                                required
                            />
                            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                                Confirm Password
                            </FormLabel>
                            <Input
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                fontSize='sm'
                                ms='4px'
                                borderRadius='15px'
                                type='password'
                                placeholder='Confirm your password'
                                mb='24px'
                                size='lg'
                                required
                            />
                            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                                Address
                            </FormLabel>
                            <Input
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                fontSize='sm'
                                ms='4px'
                                borderRadius='15px'
                                type='text'
                                placeholder='Your address'
                                mb='24px'
                                size='lg'
                            />
                            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                                Phone
                            </FormLabel>
                            <Input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                fontSize='sm'
                                ms='4px'
                                borderRadius='15px'
                                type='tel'
                                placeholder='Your phone number'
                                mb='24px'
                                size='lg'
                            />
                            <Button
                                type='submit'
                                bg='teal.300'
                                fontSize='10px'
                                color='white'
                                fontWeight='bold'
                                w='100%'
                                h='45'
                                mb='24px'
                                _hover={{
                                    bg: "teal.200",
                                }}
                                _active={{
                                    bg: "teal.400",
                                }}
                            >
                                SIGN UP
                            </Button>
                        </FormControl>
                        <Flex
                            flexDirection='column'
                            justifyContent='center'
                            alignItems='center'
                            maxW='100%'
                            mt='0px'
                        >
                            <Text color={textColor} fontWeight='medium'>
                                Already have an account?{" "}
                                <a
                                    href='/login'
                                    style={{
                                        color: titleColor,
                                        marginLeft: '5px',
                                        fontWeight: 'bold',
                                        textDecoration: 'underline',
                                    }}
                                >
                                    Sign In
                                </a>
                            </Text>
                        </Flex>
                    </form>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default SignUp;