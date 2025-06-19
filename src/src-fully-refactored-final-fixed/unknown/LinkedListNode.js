/**
 * Represents a node in a singly linked list structure.
 * Each node contains a value, a reference to the next node, and the length of the list from this node.
 *
 * @class
 * @param {number} length - The length of the list from this node.
 * @param {*} value - The value to store in this node.
 */
function LinkedListNode(length, value) {
  /**
   * The length of the list from this node.
   * @type {number}
   */
  this.length = length;

  /**
   * Reference to the next node in the list. Initialized as undefined.
   * @type {LinkedListNode|undefined}
   */
  this.next = undefined;

  /**
   * The value stored in this node.
   * @type {*}
   */
  this.value = value;
}

module.exports = LinkedListNode;