/**
 * Initializes the state for a linked list structure, including head, tail, length, and states.
 *
 * @constructor
 * @description
 * Sets up the initial properties for a linked list-like data structure. The head and tail are initialized
 * to a new node created by the ObservableNode constructor with Kb1 and default values. The length is set to zero, and
 * the states property is initialized to null.
 *
 * @example
 * const listState = new LinkedListStateInitializer();
 * // listState.head, listState.tail, listState.len, listState.states are initialized
 */
function LinkedListStateInitializer() {
  /**
   * The number of nodes in the linked list.
   * @type {number}
   */
  this.length = 0;

  /**
   * The head node of the linked list.
   * @type {object}
   */
  this.headNode = new ObservableNode(Kb1, 0, 0);

  /**
   * The tail node of the linked list (initially same as head).
   * @type {object}
   */
  this.tailNode = this.headNode;

  /**
   * Additional state information for the linked list (if any).
   * @type {object|null}
   */
  this.states = null;
}

module.exports = LinkedListStateInitializer;