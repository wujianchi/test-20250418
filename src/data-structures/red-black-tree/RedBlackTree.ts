/**
 * 红黑树实现
 * 红黑树是一种自平衡的二叉搜索树，具有以下性质：
 * 1. 每个节点是红色或黑色
 * 2. 根节点是黑色
 * 3. 所有叶子节点(NIL)是黑色
 * 4. 如果一个节点是红色，则其子节点必须是黑色
 * 5. 对于每个节点，从该节点到其所有后代叶子节点的简单路径上，均包含相同数量的黑色节点
 */

// 节点颜色枚举
enum Color {
  RED = 0,
  BLACK = 1,
}

// 红黑树节点接口
interface RBNode<T> {
  key: T;
  color: Color;
  left: RBNode<T> | null;
  right: RBNode<T> | null;
  parent: RBNode<T> | null;
}

/**
 * 红黑树实现类
 */
export class RedBlackTree<T> {
  private NIL: RBNode<T>; // 哨兵节点
  private root: RBNode<T>; // 根节点

  constructor() {
    // 初始化NIL节点（所有叶子节点都指向NIL）
    this.NIL = this.createNilNode();
    this.root = this.NIL;
  }

  /**
   * 创建NIL节点
   * @returns NIL节点
   */
  private createNilNode(): RBNode<T> {
    return {
      key: null as unknown as T,
      color: Color.BLACK,
      left: null,
      right: null,
      parent: null,
    };
  }

  /**
   * 创建新节点
   * @param key 节点键值
   * @returns 新节点
   */
  private createNode(key: T): RBNode<T> {
    return {
      key,
      color: Color.RED, // 新节点默认为红色
      left: this.NIL,
      right: this.NIL,
      parent: null,
    };
  }

  /**
   * 插入节点
   * @param key 节点键值
   */
  public insert(key: T): void {
    const newNode = this.createNode(key);
    
    let y = null;
    let x = this.root;
    
    // 找到插入位置
    while (x !== this.NIL) {
      y = x;
      if (newNode.key < x.key) {
        x = x.left!;
      } else {
        x = x.right!;
      }
    }
    
    newNode.parent = y;
    
    if (y === null) {
      // 树为空，新节点作为根节点
      this.root = newNode;
    } else if (newNode.key < y.key) {
      y.left = newNode;
    } else {
      y.right = newNode;
    }
    
    // 如果新节点是根节点，则必须是黑色的
    if (newNode.parent === null) {
      newNode.color = Color.BLACK;
      return;
    }
    
    // 如果祖父节点为空，则无需调整
    if (newNode.parent.parent === null) {
      return;
    }
    
    // 修复插入后可能破坏的红黑树性质
    this.fixInsert(newNode);
  }
  
  /**
   * 修复插入操作可能破坏的红黑树性质
   * @param k 新插入的节点
   */
  private fixInsert(k: RBNode<T>): void {
    let u: RBNode<T> | null;
    
    // 当父节点为红色时需要修复（违反了性质4）
    while (k.parent !== null && k.parent.color === Color.RED) {
      if (k.parent === k.parent.parent!.right) {
        // 父节点是祖父节点的右子节点
        u = k.parent.parent!.left; // 叔叔节点
        
        if (u !== null && u.color === Color.RED) {
          // Case 1: 叔叔节点是红色
          u.color = Color.BLACK;
          k.parent.color = Color.BLACK;
          k.parent.parent!.color = Color.RED;
          k = k.parent.parent!;
        } else {
          if (k === k.parent.left) {
            // Case 2: 叔叔节点是黑色，当前节点是左子节点
            k = k.parent;
            this.rightRotate(k);
          }
          // Case 3: 叔叔节点是黑色，当前节点是右子节点
          if (k.parent !== null) {
            k.parent.color = Color.BLACK;
            if (k.parent.parent !== null) {
              k.parent.parent.color = Color.RED;
              this.leftRotate(k.parent.parent);
            }
          }
        }
      } else {
        // 父节点是祖父节点的左子节点
        u = k.parent.parent!.right; // 叔叔节点
        
        if (u !== null && u.color === Color.RED) {
          // Case 1: 叔叔节点是红色
          u.color = Color.BLACK;
          k.parent.color = Color.BLACK;
          k.parent.parent!.color = Color.RED;
          k = k.parent.parent!;
        } else {
          if (k === k.parent.right) {
            // Case 2: 叔叔节点是黑色，当前节点是右子节点
            k = k.parent;
            this.leftRotate(k);
          }
          // Case 3: 叔叔节点是黑色，当前节点是左子节点
          if (k.parent !== null) {
            k.parent.color = Color.BLACK;
            if (k.parent.parent !== null) {
              k.parent.parent.color = Color.RED;
              this.rightRotate(k.parent.parent);
            }
          }
        }
      }
      
      if (k === this.root) {
        break;
      }
    }
    
    // 确保根节点为黑色（性质2）
    this.root.color = Color.BLACK;
  }
  
  /**
   * 左旋操作
   * @param x 旋转节点
   */
  private leftRotate(x: RBNode<T>): void {
    const y = x.right!;
    x.right = y.left;
    
    if (y.left !== this.NIL) {
      y.left.parent = x;
    }
    
    y.parent = x.parent;
    
    if (x.parent === null) {
      this.root = y;
    } else if (x === x.parent.left) {
      x.parent.left = y;
    } else {
      x.parent.right = y;
    }
    
    y.left = x;
    x.parent = y;
  }
  
  /**
   * 右旋操作
   * @param x 旋转节点
   */
  private rightRotate(x: RBNode<T>): void {
    const y = x.left!;
    x.left = y.right;
    
    if (y.right !== this.NIL) {
      y.right.parent = x;
    }
    
    y.parent = x.parent;
    
    if (x.parent === null) {
      this.root = y;
    } else if (x === x.parent.right) {
      x.parent.right = y;
    } else {
      x.parent.left = y;
    }
    
    y.right = x;
    x.parent = y;
  }

  /**
   * 前序遍历 (根-左-右)
   * @returns 遍历结果数组
   */
  public preorderTraversal(): T[] {
    const result: T[] = [];
    this.preorderTraversalHelper(this.root, result);
    return result;
  }

  /**
   * 前序遍历辅助函数
   * @param node 当前节点
   * @param result 结果数组
   */
  private preorderTraversalHelper(node: RBNode<T>, result: T[]): void {
    if (node !== this.NIL) {
      result.push(node.key);
      this.preorderTraversalHelper(node.left!, result);
      this.preorderTraversalHelper(node.right!, result);
    }
  }

  /**
   * 中序遍历 (左-根-右)
   * @returns 遍历结果数组 (升序排序)
   */
  public inorderTraversal(): T[] {
    const result: T[] = [];
    this.inorderTraversalHelper(this.root, result);
    return result;
  }

  /**
   * 中序遍历辅助函数
   * @param node 当前节点
   * @param result 结果数组
   */
  private inorderTraversalHelper(node: RBNode<T>, result: T[]): void {
    if (node !== this.NIL) {
      this.inorderTraversalHelper(node.left!, result);
      result.push(node.key);
      this.inorderTraversalHelper(node.right!, result);
    }
  }

  /**
   * 后序遍历 (左-右-根)
   * @returns 遍历结果数组
   */
  public postorderTraversal(): T[] {
    const result: T[] = [];
    this.postorderTraversalHelper(this.root, result);
    return result;
  }

  /**
   * 后序遍历辅助函数
   * @param node 当前节点
   * @param result 结果数组
   */
  private postorderTraversalHelper(node: RBNode<T>, result: T[]): void {
    if (node !== this.NIL) {
      this.postorderTraversalHelper(node.left!, result);
      this.postorderTraversalHelper(node.right!, result);
      result.push(node.key);
    }
  }

  /**
   * 层序遍历 (广度优先)
   * @returns 遍历结果数组
   */
  public levelOrderTraversal(): T[] {
    const result: T[] = [];
    if (this.root === this.NIL) {
      return result;
    }

    const queue: RBNode<T>[] = [this.root];
    
    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node.key);
      
      if (node.left !== this.NIL) {
        queue.push(node.left);
      }
      
      if (node.right !== this.NIL) {
        queue.push(node.right);
      }
    }
    
    return result;
  }

  /**
   * 获取树的深度
   * @returns 树的深度
   */
  public getDepth(): number {
    return this.getDepthHelper(this.root);
  }

  /**
   * 获取树的深度辅助函数
   * @param node 当前节点
   * @returns 以当前节点为根的子树深度
   */
  private getDepthHelper(node: RBNode<T>): number {
    if (node === this.NIL) {
      return 0;
    }
    
    const leftDepth = this.getDepthHelper(node.left!);
    const rightDepth = this.getDepthHelper(node.right!);
    
    return Math.max(leftDepth, rightDepth) + 1;
  }

  /**
   * 查找节点
   * @param key 要查找的键值
   * @returns 找到的节点，未找到返回NIL
   */
  public search(key: T): RBNode<T> {
    return this.searchHelper(this.root, key);
  }

  /**
   * 查找节点辅助函数
   * @param node 当前节点
   * @param key 要查找的键值
   * @returns 找到的节点，未找到返回NIL
   */
  private searchHelper(node: RBNode<T>, key: T): RBNode<T> {
    if (node === this.NIL || key === node.key) {
      return node;
    }
    
    if (key < node.key) {
      return this.searchHelper(node.left!, key);
    }
    
    return this.searchHelper(node.right!, key);
  }

  /**
   * 获取最小值节点
   * @returns 最小值节点的键值
   */
  public getMinimum(): T | null {
    const node = this.getMinimumNode(this.root);
    return node === this.NIL ? null : node.key;
  }

  /**
   * 获取最小值节点
   * @param node 起始节点
   * @returns 最小值节点
   */
  private getMinimumNode(node: RBNode<T>): RBNode<T> {
    let current = node;
    while (current.left !== this.NIL) {
      current = current.left;
    }
    return current;
  }

  /**
   * 获取最大值节点
   * @returns 最大值节点的键值
   */
  public getMaximum(): T | null {
    const node = this.getMaximumNode(this.root);
    return node === this.NIL ? null : node.key;
  }

  /**
   * 获取最大值节点
   * @param node 起始节点
   * @returns 最大值节点
   */
  private getMaximumNode(node: RBNode<T>): RBNode<T> {
    let current = node;
    while (current.right !== this.NIL) {
      current = current.right;
    }
    return current;
  }

  /**
   * 判断树是否为空
   * @returns 树是否为空
   */
  public isEmpty(): boolean {
    return this.root === this.NIL;
  }

  /**
   * 清空树
   */
  public clear(): void {
    this.root = this.NIL;
  }
}