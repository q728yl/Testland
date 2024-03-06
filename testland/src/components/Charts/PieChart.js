import React from "react";
import {Chart} from "react-google-charts";
import {useColorModeValue} from "@chakra-ui/react";

export function PieChart(props) {
    const {data} = props;

    const backgroundColor = useColorModeValue("gray.100", "black");
    const fontColor = useColorModeValue("black", "white"); // 根据当前主题设置字体颜色
    const options = {
        title: "",
        is3D: true,
        backgroundColor: backgroundColor, // 设置背景颜色
        fontSize: 16, // 设置字体大小
        colors: ['#E91E63', '#F44336', '#FFEB3B', '#4CAF50', '#9C27B0'], // 自定义切片颜色
        titleTextStyle: {
            color: fontColor, // 设置标题文本颜色
        },
        legendTextStyle: {
            color: fontColor, // 设置图例文本颜色
        },
    };

    return (
        <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
        />
    );
}
