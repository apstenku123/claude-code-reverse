/**
 * @class LinkedListStateManager
 * @classdesc
 *   Initializes a linked list structure to manage states.
 *   Sets up the head and tail of the list, and initializes the length and states properties.
 *
 * @example
 *   const manager = new LinkedListStateManager();
 */
function LinkedListStateManager() {
  /**
   * The current number of nodes in the linked list.
   * @type {number}
   */
  this.length = 0;

  /**
   * The head node of the linked list.
   * Initialized with a new node using the ObservableNode constructor and Kb1 as data.
   * @type {object}
   */
  this.headNode = new ObservableNode(Kb1, 0, 0);

  /**
   * The tail node of the linked list.
   * Initially the same as the head node.
   * @type {object}
   */
  this.tailNode = this.headNode;

  /**
   * Stores additional state information, if any.
   * @type {object|null}
   */
  this.states = null;
}

module.exports = LinkedListStateManager;