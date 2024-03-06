import AdminHeader from "../../components/AdminHeader";
import AdminUsers from "../../components/AdminUsers";
import {Flex, Box} from "@chakra-ui/react";

const UserAdmin = () => {
    return (
        <div>
            <AdminHeader/>
            <Flex
                direction="column"
                pt={{ base: "100px", md: "50px" }}
                alignItems="center" 
            >
                <Box width="90%"> 
                    <AdminUsers />
                </Box>
            </Flex>
        </div>

    );


}
export default UserAdmin;