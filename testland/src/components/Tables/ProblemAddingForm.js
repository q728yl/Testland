import React, { useState } from "react";
import { Button, Card, Form, Input, Radio, Upload } from "antd";
import axios from "axios";

const ProblemAddingForm = ({ setShowForm }) => {
    const [problemTitle, setProblemTitle] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [description, setDescription] = useState("");
    const [hint, setHint] = useState("");
    const [testCases, setTestCases] = useState([]);
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState([]);
    const [examples, setExamples] = useState([]);
    const [uploadType, setUploadType] = useState(null);
    const [testCasesFile, setTestCasesFile] = useState(null);

    const handleAddSubmit = () => {
        const data = {
            problemTitle,
            difficulty,
            description,
            hint,
            testCases: uploadType === "manual" ? testCases : null,
            category,
            tags,
            examples,
            testCasesFile: null, // 初始化 testCasesFile 为 null
        };

        if (uploadType === "manual") {
            // 执行手动输入测试用例的提交逻辑
            console.log("提交数据：", data);
            // 发送数据给后端的代码
            // 例如使用axios发送POST请求
            axios
                .post("http://123.60.81.146:8080/addProblem", data)
                .then((response) => {
                    // 处理成功提交后的逻辑
                })
                .catch((error) => {
                    // 处理提交失败后的逻辑
                });
        } else if (uploadType === "file") {
            // 执行上传压缩包的提交逻辑

            const data = {
                problemTitle,
                difficulty,
                description,
                hint,
                category,
                tags,
                examples,
                // testCasesFile
            };
            console.log(testCasesFile)

            const formData = new FormData();

            formData.append("problem", JSON.stringify(data));
            formData.append("testCasesFile", testCasesFile);
            console.log("上传数据：", formData);
            axios
                .post("http://123.60.81.146:8080/addProblemByFile", formData)
                .then((response) => {
                    // 处理成功提交后的逻辑
                })
                .catch((error) => {
                    // 处理提交失败后的逻辑
                });
        }

        setProblemTitle("");
        setDifficulty("");
        setDescription("");
        setHint("");
        setTestCases([]);
        setCategory("");
        setTags([]);
        setExamples([]);

        setShowForm(false);
    };

    const handleFinishFailed = (errorInfo) => {
        console.log("Failed to submit:", errorInfo);
    };

    const handleAddTestCase = () => {
        setTestCases([...testCases, { input: "", output: "" }]);
    };

    const handleTestCaseInputChange = (index, event) => {
        const updatedTestCases = [...testCases];
        updatedTestCases[index].input = event.target.value;
        setTestCases(updatedTestCases);
    };

    const handleTestCaseOutputChange = (index, event) => {
        const updatedTestCases = [...testCases];
        updatedTestCases[index].output = event.target.value;
        setTestCases(updatedTestCases);
    };

    const handleAddExample = () => {
        setExamples([...examples, { input: "", output: "", explanation: "" }]);
    };

    const handleExampleInputChange = (index, event) => {
        const updatedExamples = [...examples];
        updatedExamples[index].input = event.target.value;
        setExamples(updatedExamples);
    };

    const handleExampleOutputChange = (index, event) => {
        const updatedExamples = [...examples];
        updatedExamples[index].output = event.target.value;
        setExamples(updatedExamples);
    };

    const handleExampleExplanationChange = (index, event) => {
        const updatedExamples = [...examples];
        updatedExamples[index].explanation = event.target.value;
        setExamples(updatedExamples);
    };

    const handleTestCasesFileChange = (file) => {
        setTestCasesFile(file);
        console.log("file"+file)
        return false; // 阻止上传
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Card style={{ width: 600 }}>
                <h2>Add problem</h2>
                <Form onFinish={handleAddSubmit} onFinishFailed={handleFinishFailed} layout="vertical">
                    <Form.Item
                        label="Title"
                        name="problemTitle"
                        rules={[
                            {
                                required: true,
                                message: "Please enter propblem title",
                            },
                        ]}
                    >
                        <Input value={problemTitle} onChange={(e) => setProblemTitle(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="Difficulty"
                        name="difficulty"
                        rules={[
                            {
                                required: true,
                                message: "Please select difficulty",
                            },
                        ]}
                    >
                        <Input value={difficulty} onChange={(e) => setDifficulty(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: "Please enter description",
                            },
                        ]}
                    >
                        <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Item>

                    <Form.Item label="Hint" name="hint">
                        <Input.TextArea value={hint} onChange={(e) => setHint(e.target.value)} />
                    </Form.Item>

                    <Form.Item label="Upload">
                        <Radio.Group onChange={(e) => setUploadType(e.target.value)}>
                            <Radio value="manual">Input manually</Radio>
                            <Radio value="file">Upload .zip</Radio>
                        </Radio.Group>
                    </Form.Item>

                    {uploadType === "manual" && (
                        <Form.Item label="Testcases" name="testCases">
                            {testCases.map((testCase, index) => (
                                <div key={index} style={{ marginBottom: 16 }}>
                                    <Input
                                        placeholder="Input"
                                        value={testCase.input}
                                        onChange={(e) => handleTestCaseInputChange(index, e)}
                                        style={{ marginBottom: 8 }}
                                    />
                                    <Input
                                        placeholder="Output"
                                        value={testCase.output}
                                        onChange={(e) => handleTestCaseOutputChange(index, e)}
                                        style={{ marginBottom: 8 }}
                                    />
                                </div>
                            ))}
                            <Button type="dashed" onClick={handleAddTestCase} style={{ width: "100%" }}>
                                Add Testcases
                            </Button>
                        </Form.Item>
                    )}

                    {uploadType === "file" && (
                        <Form.Item label="Upload testcases" name="testCasesFile">
                            <Upload beforeUpload={handleTestCasesFileChange} accept=".zip">
                                <Button>Choose file to upload</Button>
                            </Upload>
                        </Form.Item>
                    )}

                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: "Please enter category",
                            },
                        ]}
                    >
                        <Input value={category} onChange={(e) => setCategory(e.target.value)} />
                    </Form.Item>

                    <Form.Item label="Tags" name="tags">
                        <Input.TextArea
                            value={tags.join(",")}
                            onChange={(e) => setTags(e.target.value.split(","))}
                            placeholder="Enter tags, use (,) to split different tags"
                        />
                    </Form.Item>

                    <Form.Item label="Sample" name="examples">
                        {examples.map((example, index) => (
                            <div key={index} style={{ marginBottom: 16 }}>
                                <Input
                                    placeholder="Input"
                                    value={example.input}
                                    onChange={(e) => handleExampleInputChange(index, e)}
                                    style={{ marginBottom: 8 }}
                                />
                                <Input
                                    placeholder="Output"
                                    value={example.output}
                                    onChange={(e) => handleExampleOutputChange(index, e)}
                                    style={{ marginBottom: 8 }}
                                />
                                <Input.TextArea
                                    placeholder="Explanation"
                                    value={example.explanation}
                                    onChange={(e) => handleExampleExplanationChange(index, e)}
                                    style={{ marginBottom: 8 }}
                                />
                            </div>
                        ))}
                        <Button type="dashed" onClick={handleAddExample} style={{ width: "100%" }}>
                            Add sample
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default ProblemAddingForm;