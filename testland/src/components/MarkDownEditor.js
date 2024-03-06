import "vditor/dist/index.css";
import React, {useEffect, useState} from "react";
import Vditor from "vditor";
import {Flex} from "@chakra-ui/react";
import {postGuide} from "../variables/MarkDownText";


const MarkDownEditor = (props) => {
    const [vditor, setVditor] = useState(null);
    const {updateContent} = props;

    useEffect(() => {
        const vditor = new Vditor("vditor", {
            height: 900, // 设置初始高度为1200px
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
        <div style={{position: "relative"}}>
            <Flex id="vditor" className="vditor" w={"100%"}/>
        </div>
    );
};


export default MarkDownEditor;
