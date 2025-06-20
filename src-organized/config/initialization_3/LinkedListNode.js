/**
 * Represents a node in a doubly-linked list structure.
 * Extends the base Node class (Iq2) and initializes sibling and parent references.
 *
 * @constructor
 */
function LinkedListNode() {
  // Call the parent constructor (Iq2) to initialize base properties
  Iq2.call(this);

  /**
   * Reference to the parent node. Null if not attached.
   * @type {LinkedListNode|null}
   */
  this.parentNode = null;

  /**
   * Reference to the next sibling node. Defaults to self (circular list).
   * @type {LinkedListNode}
   */
  this.nextSibling = this;

  /**
   * Reference to the previous sibling node. Defaults to self (circular list).
   * @type {LinkedListNode}
   */
  this.previousSibling = this;

  /**
   * The index of this node within its parent'createInteractionAccessor children. Undefined if unattached.
   * @type {number|undefined}
   */
  this.index = undefined;
}

module.exports = LinkedListNode;