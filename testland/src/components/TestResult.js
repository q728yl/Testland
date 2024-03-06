import React from "react";
import {resultList} from "../variables/Result";
import ResultBox from "./Box/ResultBox";
import {useEffect} from "react";
import {useState} from "react";
import {getTestCaseInfo} from "../services/TestService";
import "../css/Loading.css";
import {WrapItem, Wrap,Spinner, Flex, useColorModeValue, Text, Tag} from "@chakra-ui/react";
import {getUserList} from "../services/UserSerivce";
import { useToast } from "@chakra-ui/react";

const results = ["AC", "WA", "TLE", "MLE", "RE", "CE"];

const TestResult = (props) => {
    const {problemId} = props;
    const textColor = useColorModeValue("gray.700", "white");
    const bgModeColor = useColorModeValue("gray.100", "black");
    const spinnerColor= useColorModeValue("teal.300", "teal.200");
    const [resultList, setResultList] = useState("");
    const [testcases,setTestcases]=useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const toast = useToast();
    // console.log("\\jsonnnnnnnnnnnnnnnnnnnn");
    // console.log(user.userId);

    // const data = {
    //     userId:user.userId,
    //     problemId:problemId
    // };
    // console.log("bbbbbbbbbbbbbbbbbbbbb");
    // console.log(data);
    // if(!resultList) {
    //     getTestCaseInfo(user.userId,problemId,(data) => {
    //         console.log("daaaaaaaaaaaaaa")
    //         setTestcases([...data.data.testcases]);
    //         setResultList(data.data);
    //         console.log(data);
    //     })

    // }

    // const data = {
    //     userId:user.userId,
    //     problemId:problemId
    // };
    // if(!resultList) {


    //     fetch("http://123.60.81.146:8080/getTestCaseInfo", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(data),
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             //console.log(data);
    //             // 其他逻辑...

    //             // console.log(data.data.userTestcases);
    //             setResultList(data.data)
    //             setTestcases(data.data.userTestcases);
    //             console.log(data.data);
    //             // console.log(resultList) ;


    //         })
    //         .catch((error) => {
    //             console.log(error.message);
    //         });
    //     // console.log(11111111)
    //     // console.log("result"+resultList.result)
    // }



    useEffect(() => {
        const fetchTestCaseInfo = async () => {
          try {
            const data = {
              userId: user.userId,
              problemId: problemId,
            };
            const response = await fetch("http://123.60.81.146:8080/getTestCaseInfo", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
            const result = await response.json();
            if(result.status<=0 ) {
          toast({
            title: result.message,
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
          return;
        }
            setTestcases(result.data.userTestcases);
            setResultList(result.data);
            setIsLoading(false);
          } catch (error) {
            console.log(error.message);
            setIsLoading(false);
          }
        };
    
        fetchTestCaseInfo();
      }, [problemId]);

      
   

    return (
    <Flex direction="column">
      {isLoading ? (
        <Flex justify="center" alignItems="center" h="300px">
          <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'
/>
<Text m="40px" fontSize="2xl" color={textColor} fontWeight={"bold"}>
              Evaluating...
            </Text>
        </Flex>

       
      ) : (
        <>
          <Flex direction="row" mt="10px">
            <Tag
              fontSize="3xl"
              bg={resultList.result === 0 ? "green.400" : "red.500"}
              color="white"
              mx="70px"
              fontWeight="bold"
            >
              {resultList.result? results[resultList.result]:"-"}
            </Tag>
            <Text fontSize="xl" color={textColor} mr="10px">
              Score
            </Text>
            <Tag size="lg" mr={10}>
              {resultList.score?? "-"}
            </Tag>
            <Text fontSize="xl" color={textColor} mr="10px">
              Language
            </Text>
            <Tag size="lg" mr={10}>
              {resultList.language?? "-"}
            </Tag>
            <Text fontSize="lg" color={textColor} mr="10px">
              Time
            </Text>
            <Tag size="lg" mr={10}>
              {resultList.timeStamp?? "-"}
            </Tag>
          </Flex>

          <Wrap spacing={4}>
            {testcases.map((testcase, index) => (
              <WrapItem key={index} m="35px">
                <ResultBox testcase={testcase} index={index} />
              </WrapItem>
            ))}
          </Wrap>
        </>
      )}
    </Flex>
  );
};

export default TestResult;