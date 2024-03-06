import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {test} from "../services/TestService";
import Editor from "@monaco-editor/react";
import files from "../variables/Files";
import {Button, Flex, Grid, Select, Text, useColorModeValue, useToast, Spinner} from "@chakra-ui/react";
import {MoonIcon, SunIcon} from '@chakra-ui/icons';
import { waitTestInfo } from "../services/WebSocketService";
import { wait } from "@testing-library/user-event/dist/utils";

const CodingArea = (props) => {
    const {problemId, title} = props;
    const user = JSON.parse(localStorage.getItem("user"));


    const navigate = useNavigate();
    const editorRef = useRef(null);
    const [fileName, setFileName] = useState(files[0].name);
    const [codingModeColor, setCodingModeColor] = useState("vs-dark");
    const [language, setLanguage] = useState("cpp");
    const [fontSize, setFontSize] = useState(14); // 新增状态：存储编辑器字体大小
    const textColor = useColorModeValue("gray.700", "white");
    const file = files.find((file) => file.name === fileName);
    // const storedCode = localStorage.getItem('userCode');
    const storedCode = localStorage.getItem(`userCode_${problemId}`);
    const [code, setCode] = useState(
        storedCode ? storedCode : '//Type your code here...'
    );
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();
    // const userId=localStorage.getItem('userId');

    useEffect(() => {
        editorRef.current?.focus();
    }, [file.name]);

    const toggleCodingModeColor = () => {
        if (codingModeColor == "vs") setCodingModeColor("vs-dark");
        else setCodingModeColor("vs");
    }

    const handleEditorDidMount = (editor, monaco) => {
        if (!user) {
            toast({
                title: "Please log in first",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });

        } else {
            editorRef.current = editor;
            editorRef.current.getModel().onDidChangeContent((e) => {
                setCode(editor.getValue());
            });
        }
    };

    const submitCode = () => {
        console.log("submitCode");
        console.log(language);
        console.log(code); // 在此处访问用户输入的代码
        localStorage.setItem(`userCode_${problemId}`, code);
        localStorage.setItem('language', language);
        if (!user) {
            toast({
                title: "Please log in first",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });

        } else {
            const testInfo = {
                userId: user.userId, problemId: problemId, code: code, language: language
            }
            console.log(testInfo);
            waitTestInfo(localStorage.getItem('userId'), title, problemId);
            test(testInfo, (data) => {
                if(data.status > 0) {
                    setIsLoading(false);
                    // waitTestInfo(localStorage.getItem('userId'));
                }
                else {
                    toast({
                        title: data.message,
                        status: "warning",
                        duration: 3000,
                        isClosable: true,
                    });

                }
            });
        }
    };

    const saveCode = () => {
        if (!user) {
            toast({
                title: "Please log in first.",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        localStorage.setItem(`userCode_${problemId}`, code);
    };

    if(!isLoading) {
        return(
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
        );
    }


    return (
        <>
            <Flex mb={{sm: "10px", lg: "20px"}}>
                <Select
                    defaultValue="cpp"
                    onChange={(e) => setLanguage(e.target.value)}
                    maxWidth={"200px"}
                >
                    <option value="cpp">C++</option>
                    <option value="java">Java</option>
                    <option value="python">Python</option>
                </Select>

                <Flex direction="column">
                    <Text fontSize="sm" color={textColor} mx="10px">
                        Font size
                    </Text>
                    {/* 新增字体大小调节控件 */}
                    <input
                        type="range"
                        min="10"
                        max="30"
                        value={fontSize}
                        onChange={(e) => setFontSize(+e.target.value)}
                        style={{marginLeft: '16px', marginRight: '16px'}}
                    />
                </Flex>

                <Button onClick={toggleCodingModeColor}>
                    {codingModeColor === "vs" ? <MoonIcon/> : <SunIcon/>}
                </Button>
            </Flex>
            <Editor
                height="70vh"
                theme={codingModeColor}
                defaultLanguage={language}
                defaultValue={code}
                options={{fontSize}}
                onMount={handleEditorDidMount} // 添加 onMount 事件
            />
            <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                <Button onClick={saveCode}>Save</Button>
                <Button onClick={submitCode}>Submit</Button>
            </Grid>
        </>
    );
}

export default CodingArea;