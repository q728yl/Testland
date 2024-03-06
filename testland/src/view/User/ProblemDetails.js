import { Flex, Box,Image,Grid,SimpleGrid,TabList,
    Skeleton,Tabs,Tab,TabPanels,TabPanel } from "@chakra-ui/react";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import ProblemInfo from "../../components/ProblemInfo";
import { getProblemById } from "../../services/ProblemService";
import VersionManagement from "../../components/VersionManagement";
import CodingArea from "../../components/SingleFileCodingArea";
import { useState,useEffect } from "react";
// import MonacoEditor from "../../components/TestCodingArea";

const ProblemDetails = () => {
    const {problemId}=useParams();
    console.log("aaaaaaaaaaa");
    console.log(problemId)
    const [problem,setProblem] =useState();
    const [title,setTitle] =useState();
    const [isLoading,setIsLoading] =useState(true);

    console.log("problemId");
    console.log(problemId);

    if(isLoading){
        getProblemById(problemId, (data) => {
            if(data.status>0) {
                console.log(data);
                setIsLoading(false);
                setProblem(data.data);
                setTitle(data.data.problemTitle);
                console.log(data.data.problemTitle)
            };
        });
    }

    return (
        <div>
            <Header/>
            <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing='24px'>
                <Flex flexDirection='column' pt={{ base: "20px", md: "30px" }}
                      pl={{ base: "120px", md: "75px" }} pr={{ base: "20px", md: "10px" }}
                      style={{ height:"100vh",overflowY: 'scroll' }}>
                    <Tabs variant='enclosed'>
                        <TabList>
                            <Tab>Problem details</Tab>
                            <Tab>Version control</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Skeleton isLoaded={problem !== undefined}>
                                    <ProblemInfo problem={problem} />
                                </Skeleton>
                            </TabPanel>

                            <TabPanel>
                                <VersionManagement problemId={problemId}/>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Flex>
                <Flex flexDirection='column' pt={{ base: "20px", md: "30px" }}
                      pr={{ base: "40px", md: "20px" }}
                >
                    <CodingArea problemId={problemId} title={title}/>
                </Flex>
            </SimpleGrid>
        </div>
    );
}

export default ProblemDetails;
