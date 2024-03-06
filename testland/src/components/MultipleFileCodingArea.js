import React, {useEffect, useRef, useState} from "react";

import Editor from "@monaco-editor/react";
import files from "../variables/Files";
import {Button, Select} from "@chakra-ui/react";

function CodingArea() {
    console.log("files here");
    console.log(files);

    const editorRef = useRef(null);
    const [fileName, setFileName] = useState(files[0].name);
    const [showNewFileForm, setShowNewFileForm] = useState(false);


    const file = files.find((file) => file.name === fileName);

    useEffect(() => {
        editorRef.current?.focus();
    }, [file.name]);

    const [newFileName, setNewFileName] = useState("");
    const handleNewFileNameChange = (e) => {
        setNewFileName(e.target.value);
    };

    const handleNewFileSubmit = (e) => {
        e.preventDefault();
        const newFile = {
            name: newFileName,
            language: "python",
            value: ""
        };
        files.push(newFile); // 添加新文件到原始文件数组中
        setFileName(newFile.name); // 设置当前文件名为新文件名
        setNewFileName(""); // 清空输入字段
        setShowNewFileForm(false); // 隐藏表单
    };


    return (
        <>
            <div style={{display: "flex", flexDirection: "column"}}>
                <Select defaultValue={files[0].name} onChange={(e) => {
                    setFileName(e.target.value);
                }}>
                    {files.map((file) => (
                        <option key={file.name} value={file.name}>
                            {file.name}
                        </option>
                    ))}
                </Select>

                <Button onClick={() => setShowNewFileForm(true)}>+ New File</Button>


                {showNewFileForm && (
                    <form onSubmit={handleNewFileSubmit}>
                        <input type="text" placeholder="File name" value={newFileName}
                               onChange={handleNewFileNameChange}/>
                        <button type="submit">Create</button>
                        <button type="button" onClick={() => setShowNewFileForm(false)}>Cancel</button>
                    </form>
                )}

                <Editor
                    height="80vh"
                    theme="vs-dark"
                    path={file.name}
                    defaultLanguage={file.language}
                    defaultValue={file.value}
                    onMount={(editor) => (editorRef.current = editor)}
                />
            </div>
        </>
    );
}

export default CodingArea;
