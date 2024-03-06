import "vditor/dist/index.css";
import React, { useEffect, useState } from "react";
import Vditor from "vditor";
import { Flex,Button } from "@chakra-ui/react";
import { postGuide } from "../../variables/MarkDownText";
import { VditorPreview } from 'vditor'; // 导入 VditorPreview 组件
import 'vditor/dist/index.css'; // 导入 Vditor 样式
import MarkdownDisplay from "./MarkDownDisplay";
import MarkdownPreview from "./MarkDownPreview";

const MarkDownEditor = () => {
    const [vditor, setVditor] = useState(null);
    const markdownContent = `
    # Heading 1
    
    ## Heading 2
    
    ### Heading 3
    
    This is a **bold** text.
    
    This is an *italic* text.
    
    ~~This is a strikethrough text.~~
    
    - Unordered list item 1
    - Unordered list item 2
    - Unordered list item 3
    
    1. Ordered list item 1
    2. Ordered list item 2
    3. Ordered list item 3
    
    > This is a blockquote.
    
    \`console.log('Hello, World!');\`
    
    \`\`\`javascript
    function add(a, b) {
      return a + b;
    }
    \`\`\`
    
    | Column 1 | Column 2 |
    | -------- | -------- |
    | Cell 1   | Cell 2   |
    | Cell 3   | Cell 4   |
    `;
    

    useEffect(() => {
        const vditor = new Vditor("vditor", {
            height: 750, // 设置初始高度为1200px
            mode: "sv",
            after: () => {
                vditor.setValue(postGuide); // 设置字体大小
                setVditor(vditor);
            },
        });
    }, []);

    const handleExport = () => {
        if (vditor) {
            const text = vditor.getValue();
            console.log(text);
        }
    };

    return (
        <div style={{ position: "relative" }}>
            {/* <Button onClick={handleExport}>aaaaaaaaaaaaaaa</Button> */}
            {/* <MarkdownDisplay markdownContent={markdownContent}/>
            <MarkdownPreview content={markdownContent}/> */}
            {/* <VditorPreview value={markdownContent} /> */}
            <Flex id="vditor" className="vditor" w={"100%"} />
        </div>
    );
};


export default MarkDownEditor;
