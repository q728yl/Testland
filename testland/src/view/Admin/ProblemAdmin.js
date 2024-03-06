import AdminHeader from "../../components/AdminHeader";
import AdminProblem from "../../components/AdminProblem";
import {Flex, Box} from "@chakra-ui/react";

const ProblemAdmin = () => {
    return (
        <div>
            <AdminHeader/>
            <Flex
                direction="column"
                pt={{ base: "100px", md: "50px" }}
                alignItems="center" 
            >
                <Box width="90%"> 
                    <AdminProblem/>
                </Box>
            </Flex>
        </div>

    );


}

export default ProblemAdmin;