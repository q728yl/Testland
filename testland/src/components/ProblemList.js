import { Button, Flex, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Problems from "./Problems";
import Pagination from "./Tables/Pagination";
import { getAllProblemByPage, getAllCategoryName, getAllTag, selectProblemByPageAndOthers } from "../services/ProblemService";

function ProblemList() {
  const [page, setPage] = useState(1);
  const [problemdata, setProblemData] = useState([]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [difficulty, setDifficulty] = useState("-1");
  const [keyword, setKeyword] = useState("");
  const pageSize = 5; // 每页数量

  useEffect(() => {
    getAllCategoryName((data) => {
      setCategories(data.data);
    });
  }, []);

  useEffect(() => {
    getAllTag((data) => {
      console.log(data.data);
      setTags(data.data);
    });
  }, []);

  useEffect(() => {
    loadProblems();
  }, [page, category, tag, difficulty, keyword]);

  const loadProblems = () => {
    if (category === "" && tag === "" && difficulty === "-1" && keyword === "") {
      getAllProblemByPage(page, pageSize, (data) => {
        setProblemData(data.data);
      });
    } else {
      selectProblemByPageAndOthers(category, tag, difficulty, keyword, page, pageSize, (data) => {
        setProblemData(data.data);
      });
      console.log(category, tag, difficulty, keyword, page, pageSize);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleTagChange = (event) => {
    setTag(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  return (
    <div>
      <>
      <br />
        <Flex justifyContent="flex-end" marginBottom="20px">
          <Select value={category} onChange={handleCategoryChange} placeholder="Select category" marginRight="10px">
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.content}
              </option>
            ))}
          </Select>

          <Select value={tag} onChange={handleTagChange} placeholder="Select tag" marginRight="10px">
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.content}
              </option>
            ))}
          </Select>

          <Select value={difficulty} onChange={handleDifficultyChange} placeholder="Select difficulty" defaultValue="-1" marginRight="10px">
            <option value="0">Easy</option>
            <option value="1">Medium</option>
            <option value="2">Hard</option>
          </Select>

          {/* <input type="text" value={keyword} onChange={handleKeywordChange} placeholder="输入关键字" border="1px solid #ccc" marginRight="10px" /> */}
          <input
            type="text"
            value={keyword}
            onChange={handleKeywordChange}
            placeholder="Enter keyword"
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '200px'
            }}
          />

        </Flex>
          
        <Problems
          title={"Problemset"}
          captions={[
            "ID",
            "Problem",
            "Tags",
            "Difficulty",
            "Pass rate",
            "Updated",
            "Actions",
          ]}
          data={problemdata}
          keyword={keyword}
        />

          <Pagination
            currentPage={page}
            totalPages={10}
            onPageChange={handlePageChange}
          />
      </>
    </div>
  );
}

export default ProblemList;
