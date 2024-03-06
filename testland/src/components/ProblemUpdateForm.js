import React, { useState } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Flex,
    Heading,
} from "@chakra-ui/react";

const ProblemUpdateForm = (props) => {
    const { problemId, problemTitle, difficulty, description, hint, category, tags, handleUpdate } = props;
    const [updatedProblemTitle, setUpdatedProblemTitle] = useState(problemTitle);
    const [updatedDifficulty, setUpdatedDifficulty] = useState(difficulty);
    const [updatedDescription, setUpdatedDescription] = useState(description);
    const [updatedHint, setUpdatedHint] = useState(hint);
    const [updatedCategory, setUpdatedCategory] = useState(category);
    const [updatedTags, setUpdatedTags] = useState(tags);

    const handleUpdateClick = () => {
        // 在这里处理更新操作
        // 使用 updatedProblemTitle 和 updatedTags 来更新问题和标签
        console.log("更新问题:", problemId);
        console.log("更新标题:", updatedProblemTitle);
        console.log("更新标签:", updatedTags);

        // 调用父组件传入的 handleUpdate 函数，将更新后的数据传递给父组件
        handleUpdate({
            problemId: problemId,
            problemTitle: updatedProblemTitle,
            difficulty: updatedDifficulty,
            description: updatedDescription,
            hint: updatedHint,
            category: updatedCategory,
            tags: updatedTags
        });
    };

    return (
        <Flex direction="column" p={4}>
            <Heading as="h2" mb={4}>更新问题</Heading>

            <FormControl id="problemTitle" mb={4}>
                <FormLabel>问题标题</FormLabel>
                <Input
                    type="text"
                    value={updatedProblemTitle}
                    onChange={(e) => setUpdatedProblemTitle(e.target.value)}
                />
            </FormControl>

            {/* 其他表单控件省略 */}

            <Button colorScheme="teal" onClick={handleUpdateClick}>更新</Button>
        </Flex>
    );
};

export default ProblemUpdateForm;