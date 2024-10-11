class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export class Tree {
    constructor() {
        this.root=null;
    }

    insert(data) {
        this.root = this.insertRecursive(this.root, data);
    }

    insertRecursive(node,data) {
        if (node == null) {
            return new Node(data);
        }
        if (data < node.data) {
            node.left = this.insertRecursive(node.left, data);
        } else if (data > node.data) {
            node.right = this.insertRecursive(node.right, data);
        }
        return node;
    }

    deleteItem(data) {
        this.root = this.deleteRecursive(this.root, data);
    }

    deleteRecursive(node, data) {
        if (node == null) {
            return node;
        }
        if (data < node.data) {
            node.left = this.deleteRecursive(node.left, data);
        } else if (data > node.data) {
            node.right = this.deleteRecursive(node.right, data);
        } else {
            if (node.left === null && node.right === null) {
                return null;
            }

            if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            }

            node.data = this.findMinValue(node.right);
            node.right = this.deleteRecursive(node.right, node.data);
        }
        return node;
    }

    findMinValue(node) {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current.data;
    }
}

function buildTreeArray (array) {
    let sorted = [...new Set(array.sort((a, b) => a - b))];
    let treeVal = new Tree();

    function buildRecursive(sortedArray) {
        if (!sortedArray.length) return null;
        let mid = Math.floor(sortedArray.length/2);
        treeVal.insert(sortedArray[mid]);
        buildRecursive(sortedArray.slice(0, mid));
        buildRecursive(sortedArray.slice(mid + 1));
    }

    buildRecursive(sorted);
    return treeVal;

}
const tree = buildTreeArray([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(tree);

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
prettyPrint(tree.root);
// const treeval = new Tree();
// console.log(treeval.insert([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]));