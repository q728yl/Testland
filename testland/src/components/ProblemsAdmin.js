import { Flex, Grid, Icon, Input, Table, Tbody, Text, Th, Thead, Tr, useColorModeValue, Box, Heading } from "@chakra-ui/react";
import Card from "./Card/Card.js";
import CardBody from "./Card/CardBody.js";
import CardHeader from "./Card/CardHeader.js";
import { BsArrowRight } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ProblemTableRow from "./Tables/ProblemTableRow.js";
import ProblemTableRowAdmin from "./Tables/ProblemTableRowAdmin";

const ProblemsAdmin = ({ title, captions, data, handleUpdate, keyword }) => {
  const textColor = useColorModeValue("gray.700", "white");
  let mainText = useColorModeValue("gray.700", "gray.200");

  const [highlightedKeyword, setHighlightedKeyword] = useState(keyword.toString());

  useEffect(() => {
    setHighlightedKeyword(keyword.toString());
  }, [keyword]);

  const highlightText = (text) => {
    return text.replace(new RegExp(`(${highlightedKeyword})`, "gi"), "<span style='background-color: yellow'>$1</span>");
  };

  if (data && data.length !== 0) {
    return (
        <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardBody>
            <Table variant="simple" color={textColor}>
            <Thead>
                <Tr my=".8rem" pl="0px" color="gray.400">
                {captions.map((caption, idx) => {
                    return (
                    <Th color="gray.400" key={idx} ps={idx === 0 ? "0px" : null}>
                        {caption}
                    </Th>
                    );
                })}
                </Tr>
            </Thead>
            <Tbody>
                {data.map((row) => {
                return (
                    <ProblemTableRowAdmin
                    problemId={row.problemId}
                    problemTitle={<span dangerouslySetInnerHTML={{ __html: highlightText(row.problemTitle) }}></span>}
                    tags={row.tags}
                    level={row.difficulty}
                    description={row.description}
                    hint={row.hint}
                    category={row.category}
                    passRate={row.passRate * 100}
                    updateTime={row.updateTime}
                    handleUpdate={handleUpdate}
                    />
                );
                })}
            </Tbody>
            </Table>
        </CardBody>
        </Card>
    );
    } else {
        return (
        <Box textAlign="center" py={4}>
            <Flex align="center">
            <Heading as="h2" size="lg" color="gray.700" whiteSpace="nowrap">
            No more problems on current page.
            </Heading>
            </Flex>
        </Box>
        );
    }
};

export default ProblemsAdmin;
