export const Problemdata = [
    {
        problemId: "1",
        title: "最小生成树",
        tags: ["图论", "算法"],
        testCount: 100,
        passCount: 80,
        level: 0,
        instruction: `
给你一个正整数数组 \`arr\`，考虑所有满足以下条件的二叉树：

- 每个节点都有 0 个或是 2 个子节点。
- 数组 \`arr\` 中的值与树的中序遍历中每个叶节点的值一一对应。
- 每个非叶节点的值等于其左子树和右子树中叶节点的最大值的乘积。

在所有这样的二叉树中，返回每个非叶节点的值的最小可能总和。这个和的值是一个 32 位整数。

如果一个节点有 0 个子节点，那么该节点为叶节点。
`,
        examples: [
            {
                input: "4\n0 2 3 1\n2 0 4 0\n3 4 0 5\n1 0 5 0\n",
                output: "7\n",
                explanation: "最小生成树的边权之和为 7。",
            },
            // 其他例子...
        ],
        hint: "使用Kruskal或Prim算法来解决该问题。",
        updateTime: "2023-01-02"
    },
    {
        problemId: "2",
        title: "字符串反转",
        tags: ["字符串", "基础"],
        testCount: 120,
        passCount: 55,
        level: 1,
        instruction:
            "给定一个字符串，将其按照单词顺序进行反转。",
        examples: [
            {
                input: "Hello World",
                output: "World Hello",
                explanation: "将每个单词反转后得到结果。",
            },
            // 其他例子...
        ],
        hint: "可以使用语言提供的字符串处理函数来实现。",
        updateTime: "2023-01-02"
    },
    {
        problemId: "3",
        title: "两数之和",
        tags: ["数组", "算法"],
        testCount: 200,
        passCount: 180,
        level: 2,
        instruction:
            "给定一个整数数组和一个目标值，找出数组中和为目标值的两个数的索引。",
        examples: [
            {
                input: "[2, 7, 11, 15], 9",
                output: "[0, 1]",
                explanation: "2 + 7 = 9，所以返回索引 [0, 1]。",
            },
            // 其他例子...
        ],
        hint: "使用哈希表来存储已经遍历过的元素，并查找目标值与当前元素的差是否在哈希表中。",
        updateTime: "2023-01-02"
    },
    {
        problemId: 4,
        title: "最小生成树",
        tags: ["图论", "算法"],
        testCount: 100,
        passCount: 80,
        level: 0,
        instruction:
            "给定一个带权无向图，找到一棵边权之和最小的生成树。",
        examples: [
            {
                input: "4\n0 2 3 1\n2 0 4 0\n3 4 0 5\n1 0 5 0\n",
                output: "7\n",
                explanation: "最小生成树的边权之和为 7。",
            },
            // 其他例子...
        ],
        hint: "使用Kruskal或Prim算法来解决该问题。",
        updateTime: "2023-01-02"
    },
    {
        problemId: 5,
        title: "字符串反转",
        tags: ["字符串", "基础"],
        testCount: 120,
        passCount: 55,
        level: 1,
        instruction:
            "给定一个字符串，将其按照单词顺序进行反转。",
        examples: [
            {
                input: "Hello World",
                output: "World Hello",
                explanation: "将每个单词反转后得到结果。",
            },
            // 其他例子...
        ],
        hint: "可以使用语言提供的字符串处理函数来实现。",
        updateTime: "2023-01-02"
    },
    {
        problemId: 6,
        title: "两数之和",
        tags: ["数组", "算法"],
        testCount: 200,
        passCount: 180,
        level: 2,
        instruction:
            "给定一个整数数组和一个目标值，找出数组中和为目标值的两个数的索引。",
        examples: [
            {
                input: "[2, 7, 11, 15], 9",
                output: "[0, 1]",
                explanation: "2 + 7 = 9，所以返回索引 [0, 1]。",
            },
            // 其他例子...
        ],
        hint: "使用哈希表来存储已经遍历过的元素，并查找目标值与当前元素的差是否在哈希表中。",
        updateTime: "2023-01-02"
    },
];


export const Problem = {
    problemId: "1",
    title: "最小生成树",
    tags: ["图论", "算法"],
    testCount: 100,
    passCount: 80,
    level: 0,
    instruction: `
给你一个正整数数组 \`arr\`，考虑所有满足以下条件的二叉树：

- 每个节点都有 0 个或是 2 个子节点。
- 数组 \`arr\` 中的值与树的中序遍历中每个叶节点的值一一对应。
- 每个非叶节点的值等于其左子树和右子树中叶节点的最大值的乘积。

在所有这样的二叉树中，返回每个非叶节点的值的最小可能总和。这个和的值是一个 32 位整数。

如果一个节点有 0 个子节点，那么该节点为叶节点。
`,
    examples: [
        {
            input: "arr = [6,2,4]",
            output: "32",
            explanation: "有两种可能的树，第一种的非叶节点的总和为 36 ，第二种非叶节点的总和为 32 。",
        },
        {
            input: "arr = [6,2,4]",
            output: "32",
            explanation: "有两种可能的树，第一种的非叶节点的总和为 36 ，第二种非叶节点的总和为 32 。",
        },
        {
            input: "arr = [6,2,4]",
            output: "32",
            explanation: "有两种可能的树，第一种的非叶节点的总和为 36 ，第二种非叶节点的总和为 32 。",
        },
        // 其他例子...
    ],
    hint: "使用Kruskal或Prim算法来解决该问题。",
    updateTime: "2023-01-02"
}