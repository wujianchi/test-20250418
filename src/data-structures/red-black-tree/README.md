# 红黑树 (Red-Black Tree)

红黑树是一种自平衡的二叉搜索树，它在计算机科学中被广泛应用于各种数据结构中。

## 红黑树的特性

红黑树具有以下五个重要特性：

1. 每个节点要么是红色，要么是黑色
2. 根节点必须是黑色
3. 所有叶子节点（NIL节点，空节点）都是黑色
4. 如果一个节点是红色，则其两个子节点都是黑色（即不能有两个连续的红色节点）
5. 对于每个节点，从该节点到其所有后代叶子节点的简单路径上，均包含相同数量的黑色节点

这些特性确保了树的高度大致平衡，因此所有基本操作（查找、插入、删除）都能在 O(log n) 时间内完成。

## 实现内容

本实现包括以下内容：

- 红黑树的基本数据结构
- 插入操作及自平衡调整
- 四种遍历算法：
  - 前序遍历 (Preorder)：根-左-右
  - 中序遍历 (Inorder)：左-根-右
  - 后序遍历 (Postorder)：左-右-根
  - 层序遍历 (Level-order)：广度优先遍历
- 查找、获取最大/最小值、计算树的深度等辅助方法

## 算法分析

- **空间复杂度**：O(n)，用于存储n个节点
- **时间复杂度**：
  - 查找：O(log n)
  - 插入：O(log n)
  - 删除：O(log n)
  - 遍历：O(n)

## 使用方法

```typescript
import { RedBlackTree } from './RedBlackTree';

// 创建红黑树实例
const tree = new RedBlackTree<number>();

// 插入数据
tree.insert(10);
tree.insert(5);
tree.insert(15);

// 各种遍历方式
console.log(tree.inorderTraversal()); // 输出: [5, 10, 15]
console.log(tree.preorderTraversal());
console.log(tree.postorderTraversal());
console.log(tree.levelOrderTraversal());

// 其他操作
console.log(tree.search(5)); // 查找节点
console.log(tree.getMinimum()); // 最小值
console.log(tree.getMaximum()); // 最大值
console.log(tree.getDepth()); // 树的深度
```

## 应用场景

红黑树在许多系统和库中被广泛使用：

1. Java中的TreeMap和TreeSet
2. C++ STL中的map和set
3. Linux内核中的完全公平调度器
4. 数据库索引的实现

红黑树是一种性能非常好的数据结构，尤其适合需要动态维护有序数据集的场景。