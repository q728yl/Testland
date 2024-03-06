export const postGuide = `
### 简介

一个Markdown 编辑器，现在是分屏预览模式，编辑当前文本试试看吧！

你可以点击右上角三个点左侧符号，在以下三种模式之间切换：

* 所见即所得模式（Alt+Ctrl+7）
* 即时渲染模式（Alt+Ctrl+8）
* 分屏预览模式（Alt+Ctrl+9）

---

> 组合代码模块

\`\`\`java
public class Main {
    public static void main(String[] args) {
        System.out.print("你好TestLand");
    }
}
\`\`\`

\`\`\`python
print "你好TestLand"
\`\`\`

---

#### 表格

| 名称       | 缩写 |
| ---------- | ---- |
| JavaScript | js   |
| Python     | py   |
| C++        | cpp  |

> 使用冒号定义对齐方式

| 题号 |       标题 | 难易度 |
| :--- | ---------: | :----: |
| 1    |   两数之和 |  简单  |
| 15   |   三数之和 |  中等  |
| 262  | 行程和用户 |  困难  |

---

#### 链接


[这是codesandbox](https://codesandbox.io/)

---

#### 图片

> 使用传统 \`![图片名称](图片地址)\` Markdown 语法，或将图片直接拖拽到编辑器中进行上传。

---

#### 视频

> 使用工具栏中「视频上传」工具进行上传，支持 m4v、mp4、mov、flv 等多种主流视频格式。
`;