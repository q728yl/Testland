import {Button, Flex, Td, Text, Tr, useColorModeValue, Avatar} from "@chakra-ui/react";
import React from "react";
import {changeUserStatus} from "../../services/UserSerivce";
// import { Avatar } from "antd";

function UserTableRow(props) {
    const {userId, username, avatar, email, phone, address, status} = props;
    const textColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "#1a202c");
    const colorStatus = useColorModeValue("white", "gray.400");
    console.log("status" + status);
    console.log("username" + username);
    return (
        <Tr>

            <Td>
                <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                    <Text fontSize="md" color={textColor} fontWeight="bold">
                        {userId}
                    </Text>
                </Flex>
            </Td>

            <Td minWidth={{sm: "100x"}} pl="0px">
                <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                    <Text fontSize="md" color={textColor} fontWeight="bold">
                        {username}
                    </Text>
                </Flex>
            </Td>

            <Td minWidth={{sm: "100x"}} pl="0px">
                <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                    {/* <Text fontSize="md" color={textColor} fontWeight="bold">
                        {avatar}
                    </Text> */}
                    <Avatar src={avatar} size="sm" />
                </Flex>
            </Td>

            <Td minWidth={{sm: "100x"}} pl="0px">
                <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                    <Text fontSize="md" color={textColor} fontWeight="bold">
                        {email}
                    </Text>
                </Flex>
            </Td>

            <Td>
                <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
                    {phone}
                </Text>
            </Td>
            <Td>
                <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
                    {address}
                </Text>
            </Td>
            <Td>
                <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
                    {status === '0' ? "Inactive" : "Active"}
                </Text>
            </Td>
            <Td>

                <Button p="0px" bg="transparent" variant="no-hover" onClick={() => changeUserStatus(username)}>
                    <a>
                        <Text
                            fontSize="md"
                            color="gray.400"
                            fontWeight="bold"
                            cursor="pointer"
                        >
                            {status === '1' ? "Deactive" : "Active"}
                        </Text>
                    </a>
                </Button>
            </Td>
        </Tr>
    );
}

export default UserTableRow;
