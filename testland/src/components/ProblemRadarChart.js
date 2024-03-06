import React, {useEffect, useState} from "react";
import {Badge, Box, Flex, Grid, SimpleGrid, Stack, useColorModeValue} from "@chakra-ui/react";
import RadarChart from "react-svg-radar-chart";
import "react-svg-radar-chart/build/css/index.css";
import ChartStatistics from "./ChartStatistics";
import {getCategory} from "../services/ProblemService";
import {CartIcon, RocketIcon, StatsIcon, WalletIcon,} from "./Icons/Icons.js";

const HexagonRadarChart = () => {
    const textColor = useColorModeValue("gray.700", "gray");
    const bgModeColor = useColorModeValue("gray.100", "black");
    const iconBoxInside = useColorModeValue("white", "white");
    const [data, setData] = useState([]);
    const [captions, setCaptions] = useState({});
    const [count1, setCount1] = useState();
    const [count2, setCount2] = useState();
    const [count3, setCount3] = useState();
    const [count4, setCount4] = useState();
    const [count5, setCount5] = useState();
    const [count6, setCount6] = useState();


    useEffect(() => {
        getCategory((res) => {
            // setProblemData([...data.data]);
            console.log(res.data);
            const backendData = res.data; // 后端返回的数据
            let newCaptions = {
                stat1: "-",
                stat2: "-",
                stat3: "-",
                stat4: "-",
                stat5: "-",
                stat6: "-",
            }

            let newData = [
                {
                    data: {
                        stat1: 0,
                        stat2: 0,
                        stat3: 0,
                        stat4: 0,
                        stat5: 0,
                        stat6: 0,
                    },
                    meta: {color: "blue"},
                },
            ];

            backendData.forEach((item, index) => {
                const {category, count} = item;
                const stat = `stat${index + 1}`;

                newCaptions[stat] = category;
                newData[0].data[stat] = count;
            });
            newData[0].data.stat2=newData[0].data.stat2/newData[0].data.stat1;
            newData[0].data.stat3=newData[0].data.stat3/newData[0].data.stat1;
            newData[0].data.stat4=newData[0].data.stat4/newData[0].data.stat1;
            newData[0].data.stat5=newData[0].data.stat5/newData[0].data.stat1;
            newData[0].data.stat6=newData[0].data.stat6/newData[0].data.stat1;



            setCount1(newData[0].data.stat1);
            setCount2(newData[0].data.stat2);
            setCount3(newData[0].data.stat3);
            setCount4(newData[0].data.stat4);
            setCount5(newData[0].data.stat5);
            setCount6(newData[0].data.stat6);
            newData[0].data.stat1=1;
            setCaptions(newCaptions);
            setData(newData);
        });

    }, []);

    // const captions = {
    //   // 设置每个轴的标题
    //   stat1: "前端",
    //   stat2: "后端",
    //   stat3: "算法",
    //   stat4: "数据结构",
    //   stat5: "Shell",
    //   stat6: "面试",
    // };

    // const data = [
    //   {
    //     data: {
    //       stat1: 0.7,
    //       stat2: 0.8,
    //       stat3: 0.9,
    //       stat4: 0.67,
    //       stat5: 0.8,
    //       stat6: 0.7,
    //     },
    //     meta: { color: "blue" },
    //   },
    // ];

    return (
        <Box borderRadius="2xl" overflow="hidden" bg={bgModeColor}>
            <Flex flexDirection='column'>
                <Grid
                    templateColumns={{md: "1fr", lg: "1.8fr 1.2fr"}}
                    templateRows={{md: "1fr auto", lg: "1fr"}}
                    my='26px'
                    gap='24px'>
                    <RadarChart
                        captions={captions}
                        data={data}
                        size={350} // 设置雷达图大小
                        options={{
                            scales: 6, // 设置六边形
                            captionMargin: 20,
                            captionProps: () => ({
                                fontSize: "xl",
                                fontWeight: "bold",
                                fill: textColor,
                                textAnchor: "middle", // 居中对齐
                                captionOffset: 100, // 将 caption 移动到雷达图外部
                            }),
                            polygonProps: () => ({
                                fill: bgModeColor,
                            }),
                        }}
                    />


                    <SimpleGrid gap={{sm: "12px"}} columns={{sm: 4, md: 4, lg: 1}}>
                        <ChartStatistics
                            title={captions.stat1}
                            amount={count1}
                            percentage={100}
                            icon={<WalletIcon h={"15px"} w={"15px"} color={iconBoxInside}/>}
                        />
                        <ChartStatistics
                            title={captions.stat2}
                            amount={count2*count1}
                            percentage={count2*100}
                            icon={<RocketIcon h={"15px"} w={"15px"} color={iconBoxInside}/>}
                        />
                        <ChartStatistics
                            title={captions.stat3}
                            amount={count3*count1}
                            percentage={count3*100}
                            icon={<CartIcon h={"15px"} w={"15px"} color={iconBoxInside}/>}
                        />
                        <ChartStatistics
                            title={captions.stat4}
                            amount={count4*count1}
                            percentage={count4*100}
                            icon={<StatsIcon h={"15px"} w={"15px"} color={iconBoxInside}/>}
                        />
                    </SimpleGrid>
                </Grid>
                <Flex margin="40px" flexDirection='column'>
                    <Stack direction='row' marginBottom={"20px"}>
                        <Badge fontSize='xl'>interview</Badge>
                        <Badge colorScheme='green' fontSize='xl'>database</Badge>
                        <Badge colorScheme='red' fontSize='xl'>media</Badge>
                        <Badge colorScheme='purple' fontSize='xl'>pandas</Badge>
                        <Badge colorScheme='purple' fontSize='xl'>ML</Badge>
                    </Stack>
                </Flex>
            </Flex>
        </Box>
    );
};

export default HexagonRadarChart;

