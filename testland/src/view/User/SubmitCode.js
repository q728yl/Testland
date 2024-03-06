import React, {useEffect, useState} from "react";
import TestResult from "../../components/TestResult";
import {Divider, Flex, Grid, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorModeValue} from "@chakra-ui/react";
import Header from "../../components/Header";
import {useLocation} from "react-router-dom";
import Editor from "@monaco-editor/react";
import ProblemPieChart from "../../components/ProblemPieChart";
import {getProblemStatistics} from "../../services/ProblemService";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

// export const data = [
//     ["Task", "Hours per Day"],
//     ["WA", 11],
//     ["MLE", 2],
//     ["TLE", 2],
//     ["AC", 2],
//     ["RE", 7],
// ];

const SubmitCode = () => {
    const textColor = useColorModeValue("gray.700", "white");
    const bgModeColor = useColorModeValue("gray.100", "black");
    const query = useQuery();
    const problemId = query.get("problemId");
    const title = query.get("title");
    const userId = query.get("userId");
    const userCode = localStorage.getItem(`userCode_${problemId}`);
    const language = localStorage.getItem("language");
    const [data, setData] = useState();
    const [editorTheme, setEditorTheme] = useState(
        useColorModeValue("vs", "vs-dark")
    );

    useEffect(() => {
        getProblemStatistics(problemId, (data) => {
            console.log(data);
            if (data.status > 0 && data.data) {
                const sum = data.data.waCount + data.data.mleCount + data.data.tleCount + data.data.acCount + data.data.reCount;
                const sta = [
                    ["Task", "Hours per Day"],
                    ["WA", 100 * data.data.waCount / sum],
                    ["MLE", 100 * data.data.mleCount / sum],
                    ["TLE", 100 * data.data.tleCount / sum],
                    ["AC", 100 * data.data.acCount / sum],
                    ["RE", 100 * data.data.reCount / sum],
                ];
                setData(sta);
            } else setData(null)
        });
    }, []);

    console.log(data);

    return (
        <div>
            <Header/>
            {/* <div>
      <h1>Submit Code</h1>
      <p>Problem ID: {problemId}</p>
      <p>Title: {title}</p>
      <p>User ID: {userId}</p>
    </div> */}
            <Grid
                templateColumns={{base: "1fr", sm: "1fr", md: "1fr", lg: "2.0fr 10px 1.0fr"}}
                // 添加 10px 宽的列来放置 Divider
                templateRows={{md: "1fr auto", lg: "1fr"}}
                templateAreas={{ // 定义 grid 区域
                    lg: `
            "leftColumn divider rightColumn"
          `,
                }}
            >
                <Flex
                    gridArea="leftColumn" // 指定左侧区域
                    flexDirection="column"
                    pt={{base: "40px", md: "60px"}}
                    pl={{base: "120px", md: "75px"}}
                >
                    <Text fontSize="3xl" color={textColor} fontWeight="bold" mb="20px">
                        {title}
                    </Text>
                    <Tabs variant='enclosed'>
                        <TabList>
                            <Tab>测评结果</Tab>
                            <Tab>源代码</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <TestResult problemId={problemId}/>
                            </TabPanel>
                            <TabPanel>
                                <Editor
                                    height="70vh"
                                    theme={editorTheme}
                                    defaultLanguage={language}
                                    defaultValue={userCode}
                                    options={{readOnly: true, fontSize: 18}}
                                />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Flex>
                <Divider
                    gridArea="divider" // 指定放置 Divider 的区域
                    orientation="vertical"
                    alignSelf="stretch"

                />
                <Flex
                    gridArea="rightColumn" // 指定右侧区域
                    flexDirection="column"
                    pt={{base: "40px", md: "60px"}}
                    px={{base: "120px", md: "75px"}}
                    bg={bgModeColor}
                >
                    <ProblemPieChart data={data}/>
                </Flex>
            </Grid>

        </div>

    );
}

export default SubmitCode;