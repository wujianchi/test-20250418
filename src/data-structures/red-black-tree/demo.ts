/**
 * 红黑树演示
 * 
 * 用于测试红黑树的功能和遍历算法
 */

import { RedBlackTree } from './RedBlackTree';

// 创建一个数字类型的红黑树
const numTree = new RedBlackTree<number>();

// 插入一些数据
console.log("插入数据: 10, 20, 30, 15, 25, 5, 35, 40, 3, 7");
numTree.insert(10);
numTree.insert(20);
numTree.insert(30);
numTree.insert(15);
numTree.insert(25);
numTree.insert(5);
numTree.insert(35);
numTree.insert(40);
numTree.insert(3);
numTree.insert(7);

// 展示各种遍历方式
console.log("\n=== 红黑树遍历演示 ===");

// 前序遍历
console.log("前序遍历 (根-左-右):", numTree.preorderTraversal());

// 中序遍历 (结果应该是有序的)
console.log("中序遍历 (左-根-右):", numTree.inorderTraversal());

// 后序遍历
console.log("后序遍历 (左-右-根):", numTree.postorderTraversal());

// 层序遍历
console.log("层序遍历 (广度优先):", numTree.levelOrderTraversal());

// 其他操作演示
console.log("\n=== 其他操作演示 ===");
console.log("树的深度:", numTree.getDepth());
console.log("最小值:", numTree.getMinimum());
console.log("最大值:", numTree.getMaximum());
console.log("查找值 15:", numTree.search(15) !== null);
console.log("查找值 100:", numTree.search(100) !== null);

// 字符串类型红黑树
console.log("\n=== 字符串类型红黑树 ===");
const strTree = new RedBlackTree<string>();
strTree.insert("banana");
strTree.insert("apple");
strTree.insert("orange");
strTree.insert("grape");
strTree.insert("kiwi");

console.log("中序遍历 (应为字母顺序):", strTree.inorderTraversal());
console.log("最小值 (字母顺序):", strTree.getMinimum());
console.log("最大值 (字母顺序):", strTree.getMaximum());

// 执行演示
console.log("\n运行结果:");
// 以上代码将在运行时输出结果