import React, { useState, useEffect } from "react";
import {
    Button,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    Textarea,
    FormControl,
    FormLabel,
    Stack,
    Tag,
    TagLabel,
    TagCloseButton,
} from "@chakra-ui/react";
import ProblemList from "./ProblemList";
import ProblemAddingForm from "./Tables/ProblemAddingForm";
import { getCategoryContentById } from "../services/ProblemService";
import ProblemListAdmin from "./ProblemListAdmin";

const AdminProblem = () => {
    const [showForm, setShowForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editProblemId, setEditProblemId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        problemId: "",
        problemTitle: "",
        difficulty: "",
        description: "",
        hint: "",
        category: "",
        tags: [],
        newTag: "", // 新标签输入框的值
    });

    const handleAddProblem = () => {
        setShowForm(true);
    };

    const handleEditProblem = () => {
        const problemId = prompt("Please enter problem ID:");
        if (problemId) {
            setEditProblemId(problemId);
            fetchProblemData(problemId);
        }
    };

    const fetchProblemData = async (problemId) => {
        try {
            const response = await fetch(`http://123.60.81.146:8080/getProblemById?problemId=${problemId}`);
            if (response.ok) {
                const data = await response.json();
                if (data.status === 1) {
                    setEditFormData(data.data);
                    // 获取类别内容
                    getCategoryContentById(data.data.categoryId, (result) => {
                        if (result.status === 1) {
                            setEditFormData((prevState) => ({
                                ...prevState,
                                category: result.data,
                            }));
                            setShowEditForm(true);
                        } else {
                            console.error(result.message);
                        }
                    });
                } else {
                    console.error(data.message);
                }
            } else {
                alert("Failed to fetch problem "+problemId+",this problem does not exist");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({
            ...editFormData,
            [name]: value,
        });
    };

    const handleTagsChange = (selectedTags) => {
        setEditFormData({
            ...editFormData,
            tags: selectedTags,
        });
    };

    const handleAddTag = () => {
        const newTag = editFormData.newTag.trim();
        if (newTag) {
            setEditFormData((prevState) => ({
                ...prevState,
                tags: [...prevState.tags, { content: newTag }],
                newTag: "", // 清空新标签输入框
            }));
        }
    };

    const handleEditFormSubmit = async () => {
        try {
            // 格式化数据以提交
            const updatedProblem = {
                problemId: editProblemId.toString(),
                problemTitle: editFormData.problemTitle ? editFormData.problemTitle.toString() : "",
                difficulty: editFormData.difficulty ? editFormData.difficulty.toString() : "",
                description: editFormData.description ? editFormData.description.toString() : "",
                hint: editFormData.hint ? editFormData.hint.toString() : "",
                category: editFormData.category ? editFormData.category.toString() : "",
                tags: editFormData.tags ? editFormData.tags.map((tag) => tag.content.toString()) : [],
            };

            const response = await fetch("http://123.60.81.146:8080/updateProblem", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProblem),
            });

            if (response.ok) {
                // 处理成功的更新
                setShowEditForm(false);
                setEditProblemId(null);
                setEditFormData({
                    problemId: "",
                    problemTitle: "",
                    difficulty: "",
                    description: "",
                    hint: "",
                    category: "",
                    tags: [],
                    newTag: "", // 清空新标签输入框
                });
            } else {
                console.error("Failed to update problem");
            }
        } catch (error) {
            console.error(error);
        }
        window.location.reload();
    };

    return (
        <Flex  direction='column' pt={{ base: "100px", md: "50px" }}>
            <div>
                {!showForm && (
                    <div>
                        <div>
                            <ProblemListAdmin />
                            <Button colorScheme="blue" onClick={handleAddProblem}>Add problem</Button>
                        </div>
                        <br />
                        <div>
                            <Button colorScheme="blue" onClick={handleEditProblem}>
                                Update problem Info
                            </Button>
                        </div>
                    </div>
                )}
                {showForm && <ProblemAddingForm setShowForm={setShowForm} />}
            </div>

            {showEditForm && (
                <Modal isOpen={true} onClose={() => setShowEditForm(false)}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit problem</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                <Input
                                    type="text"
                                    name="problemTitle"
                                    value={editFormData.problemTitle}
                                    onChange={handleInputChange}
                                    placeholder="problem title"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Difficulty</FormLabel>
                                <Input
                                    type="number"
                                    name="difficulty"
                                    value={editFormData.difficulty}
                                    onChange={handleInputChange}
                                    placeholder="difficulty"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    name="description"
                                    value={editFormData.description}
                                    onChange={handleInputChange}
                                    placeholder="problem description"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Hint</FormLabel>
                                <Textarea
                                    name="hint"
                                    value={editFormData.hint}
                                    onChange={handleInputChange}
                                    placeholder="hint"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Category</FormLabel>
                                <Input
                                    type="text"
                                    name="category"
                                    value={editFormData.category}
                                    onChange={handleInputChange}
                                    placeholder="category"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Tag</FormLabel>
                                <Stack spacing={2}>
                                    {editFormData.tags.map((tag, index) => (
                                        <Tag key={index} size="md" variant="solid" colorScheme="teal">
                                            <TagLabel>{tag.content}</TagLabel>
                                            <TagCloseButton
                                                onClick={() => {
                                                    const updatedTags = [...editFormData.tags];
                                                    updatedTags.splice(index, 1);
                                                    handleTagsChange(updatedTags);
                                                }}
                                            />
                                        </Tag>
                                    ))}
                                </Stack>
                                <Input
                                    type="text"
                                    name="newTag"
                                    value={editFormData.newTag}
                                    onChange={handleInputChange}
                                    placeholder="Enter new tag..."
                                />
                                <Button
                                    size="sm"
                                    colorScheme="teal"
                                    onClick={() => {
                                        handleAddTag();
                                    }}
                                >
                                    Add tag
                                </Button>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={handleEditFormSubmit}>
                                Submit
                            </Button>
                            <Button onClick={() => setShowEditForm(false)}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}

        </Flex>
    );
};

export default AdminProblem;
