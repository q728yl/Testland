// ProblemEditForm.jsx

import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { updateProblem } from "../services/ProblemService";

function ProblemEditForm({ problem }) {
    const [updatedProblem, setUpdatedProblem] = useState(problem);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProblem((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        updateProblem(updatedProblem) // 调用后端接口来更新题目
            .then((response) => {
                console.log("Problem updated successfully!");
                // 处理更新成功后的逻辑，例如提示用户更新成功、跳转回题目列表页面等
            })
            .catch((error) => {
                console.error("Failed to update problem:", error);
                // 处理更新失败的逻辑，例如提示用户更新失败、显示错误信息等
            });
    };

    return (
        <div>
            <FormControl>
                <FormLabel>Problem title</FormLabel>
                <Input
                    name="problemTitle"
                    value={updatedProblem.problemTitle}
                    onChange={handleChange}
                />
            </FormControl>
            {/* 其他表单字段省略，根据需要添加 */}
            <Button onClick={handleSubmit}>Save changes</Button>
        </div>
    );
}

export default ProblemEditForm;
