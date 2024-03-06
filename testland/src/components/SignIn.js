import React, {useState} from "react";
import signInImage from "../assets/img/signInImage.png"
// Chakra imports
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Switch,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { login, getSalt } from "../services/UserSerivce";
import bcrypt from 'bcryptjs'
// Assets

function SignIn() {
    // Chakra color mode
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [isRemember, setIsRemember] = useState(false);

    const titleColor = useColorModeValue("teal.300", "teal.200");
    const textColor = useColorModeValue("gray.400", "white");


  const handleSignIn = async () => {
        // 验证用户名和密码
        console.log(username);
        console.log(password);

    try {
      const salt = await getSalt(username);
      console.log(salt);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const userData = {
        username,
        hashedPassword
      };

      await login(userData);
    } catch (error) {
      console.error(error);
    }
    };

    return (
        <Flex position='relative' mb='40px'>
            <Flex
                h={{sm: "initial", md: "75vh", lg: "85vh"}}
                w='100%'
                maxW='1044px'
                mx='auto'
                justifyContent='space-between'
                mb='30px'
                pt={{sm: "100px", md: "0px"}}>
                <Flex
                    alignItems='center'
                    justifyContent='start'
                    style={{userSelect: "none"}}
                    w={{base: "100%", md: "50%", lg: "42%"}}>
                    <Flex
                        direction='column'
                        w='100%'
                        background='transparent'
                        p='48px'
                        mt={{md: "150px", lg: "80px"}}>
                        <Heading color={titleColor} fontSize='32px' mb='10px'>
                            Welcome Back
                        </Heading>
                        <Text
                            mb='36px'
                            ms='4px'
                            color={textColor}
                            fontWeight='bold'
                            fontSize='14px'>
                            Enter your username and password to sign in
                        </Text>
                        <FormControl>
                            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                                Username
                            </FormLabel>
                            <Input
                                borderRadius='15px'
                                mb='24px'
                                fontSize='sm'
                                type='text'
                                placeholder='Your username'
                                size='lg'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                                Password
                            </FormLabel>
                            <Input
                                borderRadius='15px'
                                mb='36px'
                                fontSize='sm'
                                type='password'
                                placeholder='Your password'
                                size='lg'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {/* <FormControl display='flex' alignItems='center'>
                                <Switch
                                    id='remember-login'
                                    colorScheme='teal'
                                    me='10px'
                                    checked={isRemember}
                                    onChange={() => setIsRemember(!isRemember)}
                                />
                                <FormLabel
                                    htmlFor='remember-login'
                                    mb='0'
                                    ms='1'
                                    fontWeight='normal'>
                                    Remember me
                                </FormLabel>
                            </FormControl> */}
                            <Button
                                fontSize='10px'
                                type='submit'
                                bg='teal.300'
                                w='100%'
                                h='45'
                                mb='20px'
                                color='white'
                                mt='20px'
                                _hover={{
                                    bg: "teal.200",
                                }}
                                _active={{
                                    bg: "teal.400",
                                }}
                                onClick={handleSignIn}
                            >
                                SIGN IN
                            </Button>
                        </FormControl>
                        <Flex
                            flexDirection='column'
                            justifyContent='center'
                            alignItems='center'
                            maxW='100%'
                            mt='0px'>
                            <Text color={textColor} fontWeight='medium'>
                                Don't have an account?
                                {/* <Link to="/signup" color={titleColor} as="span" ms="5px" fontWeight="bold">
                  Sign Up
                </Link> */}
                                <a href="/signup"
                                   style={{
                                       color: titleColor,
                                       marginLeft: '5px',
                                       fontWeight: 'bold',
                                       textDecoration: 'underline'
                                   }}>
                                    Sign Up
                                </a>
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Box
                    display={{base: "none", md: "block"}}
                    overflowX='hidden'
                    h='100%'
                    w='40vw'
                    position='absolute'
                    right='0px'>
                    <Box
                        bgImage={signInImage}
                        w='100%'
                        h='100%'
                        bgSize='cover'
                        bgPosition='50%'
                        position='absolute'
                        borderBottomLeftRadius='20px'></Box>
                </Box>
            </Flex>
        </Flex>
    );
}

export default SignIn;
