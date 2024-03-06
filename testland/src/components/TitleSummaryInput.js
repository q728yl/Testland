// Chakra imports
import {Button, Flex, useColorModeValue,} from "@chakra-ui/react";
// Custom components
import Card from "./Card/Card.js";
import CardBody from "./Card/CardBody.js";
import CardHeader from "./Card/CardHeader.js";
import React from "react";

const TitleSummaryInput = ({title, mastercard, visa}) => {
    const iconTeal = useColorModeValue("teal.300", "teal.300");
    const textColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("#dee2e6", "gray.500");
    const bgButton = useColorModeValue(
        "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
        "gray.800"
    );

    return (

        <Card p='16px' mt='24px'>
            <CardHeader>
                <Flex justify='space-between' align='center' minHeight='60px' w='100%'>
                    <Button bg="teal" color='white' fontSize='2xl' variant='no-hover'>
                        + post
                    </Button>

                </Flex>
            </CardHeader>
            <CardBody>

            </CardBody>
        </Card>
    );
};

export default TitleSummaryInput;
