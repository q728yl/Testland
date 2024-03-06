import {Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue} from "@chakra-ui/react";
import BgSignUp from "../assets/img/BgSignUp.png";
import {useEffect, useState} from "react";
import {getRankingList} from "../services/UserSerivce";

function RankingList() {
    const titleColor = useColorModeValue("teal.300", "teal.200");
    const textColor = useColorModeValue("gray.700", "white");
    const bgColor = useColorModeValue("white", "gray.700");
    const bgIcons = useColorModeValue("teal.200", "rgba(255, 255, 255, 0.5)");

    const [userList, setUserList] = useState([]);

    useEffect(() => {
        getRankingList((data) => {
            console.log(data.data);
            setUserList([...data.data]);
        });
    }, []);
    console.log(userList)


    const head = ["Rank", "User", "Email", "PASS", "PASS"];

    return (
        <Flex
            direction='column'
            alignSelf='center'
            justifySelf='center'
            overflow='hidden'
            // bg={bgColor}
        >
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
            <Flex
                direction='column'
                textAlign='center'
                justifyContent='center'
                align='center'
                mt='6.5rem'
                mb='30px'
            >
                <Text fontSize='4xl' color='white' fontWeight='bold'>
                    Ranking List
                </Text>
                <Text
                    fontSize='md'
                    color='white'
                    fontWeight='normal'
                    mt='10px'
                    mb='26px'
                    w={{base: "90%", sm: "60%", lg: "40%", xl: "30%"}}
                >
                    Ranking based on the number and pass rate of answer questions.
                </Text>
            </Flex>
            <Flex
                alignItems="center"
                justifyContent="center"
                mb="60px"
                mt="20px"
            >
                <Flex
                    direction="column"
                    width="1000px"
                    background="transparent"
                    borderRadius="15px"
                    p="40px"
                    mx={{base: "100px"}}
                    bg={bgColor}
                    boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
                >
                    <Table variant='simple' color={textColor}>
                        {/* 表头 */}
                        <Thead align="center">
                            <Tr my='.8rem' pl='0px' color='gray.400'>
                                {head.map((caption, idx) => {
                                    return (
                                        <Th color='gray.400' key={idx} ps={idx === 0 ? "0px" : null}>
                                            {caption}
                                        </Th>
                                    );
                                })}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {userList.map((user, index) => (
                                <Tr align="center" key={index}>
                                    {/* 排名 */}
                                    <Td>
                                        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                                            <Text fontSize="md" color={textColor} fontWeight="bold">
                                                {index + 1}
                                            </Text>
                                        </Flex>
                                    </Td>

                                    {/* 用户头像和姓名 */}
                                    <Td>
                                        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                                            <Box>
                                                <Flex alignItems="center">
                                                    <Box
                                                        width="50px"
                                                        height="50px"
                                                        borderRadius="50%"
                                                        backgroundImage={`url(${user.avatar})`}
                                                        backgroundSize="cover"
                                                        backgroundPosition="center"
                                                        backgroundRepeat="no-repeat"
                                                        mr="12px"
                                                    ></Box>
                                                    <Text fontWeight="medium" textAlign="center">
                                                        {user.username}
                                                    </Text>
                                                </Flex>
                                            </Box>
                                        </Flex>
                                    </Td>

                                    {/* 邮箱 */}
                                    <Td>
                                        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                                            <Text textAlign="center">
                                                {user.email}
                                            </Text>
                                        </Flex>
                                    </Td>

                                    <Td>
                                        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                                            <Text textAlign="center">
                                                {user.passCount}
                                            </Text>
                                        </Flex>
                                    </Td>

                                    {/* 通过率 */}
                                    <Td>
                                        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                                            <Flex alignItems="center">
                                                <Box
                                                    width="50px"
                                                    height="6px"
                                                    bg="#E2E8F0"
                                                    borderRadius="4px"
                                                    position="relative"
                                                    overflow="hidden"
                                                >
                                                    <Box
                                                        width={`${user.passRate * 100}%`}
                                                        height="100%"
                                                        bg="#4299E1"
                                                        borderRadius="4px"
                                                    ></Box>
                                                </Box>
                                                <Text fontSize="sm" fontWeight="medium" ml="8px">
                                                    {user.passRate * 100}%
                                                </Text>
                                            </Flex>
                                        </Flex>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>

                </Flex>
            </Flex>

        </Flex>
    );
}

export default RankingList;
