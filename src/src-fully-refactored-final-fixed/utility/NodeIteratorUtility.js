/**
 * NodeIteratorUtility constructs a node iterator for traversing a DOM-like tree structure.
 * It validates the root node, sets up traversal parameters, and attaches itself to the document.
 *
 * @param {Object} rootNode - The root node from which iteration begins. Must have a nodeType property.
 * @param {number} whatToShow - Bitmask indicating which node types to show (e.g., NodeFilter constants).
 * @param {Function|null} filterFunction - Optional. a function to filter nodes during iteration.
 * @throws {Error} Throws NotSupportedError if rootNode is invalid.
 */
function NodeIteratorUtility(rootNode, whatToShow, filterFunction) {
  // Validate that rootNode is a valid node with a nodeType property
  if (!rootNode || !rootNode.nodeType) {
    zM2.NotSupportedError();
  }

  /**
   * The root node for this iterator
   * @type {Object}
   */
  this._root = rootNode;

  /**
   * The reference node for the iterator'createInteractionAccessor current position
   * @type {Object}
   */
  this._referenceNode = rootNode;

  /**
   * Indicates if the pointer is before the reference node
   * @type {boolean}
   */
  this._pointerBeforeReferenceNode = true;

  /**
   * Bitmask specifying which node types to show
   * @type {number}
   */
  this._whatToShow = Number(whatToShow) || 0;

  /**
   * Optional filter function for node iteration
   * @type {Function|null}
   */
  this._filter = filterFunction || null;

  /**
   * Indicates if the iterator is currently active
   * @type {boolean}
   */
  this._active = false;

  // Attach this iterator to the document for tracking
  rootNode.doc._attachNodeIterator(this);
}

module.exports = NodeIteratorUtility;