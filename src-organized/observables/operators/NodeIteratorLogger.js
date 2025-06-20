/**
 * NodeIteratorLogger is a utility class for iterating over DOM nodes with optional filtering and logging capabilities.
 * It validates the root node, sets up iteration state, and attaches itself to the document for tracking.
 *
 * @class NodeIteratorLogger
 * @param {Node} rootNode - The root node from which to start iteration. Must be a valid DOM Node.
 * @param {number} whatToShow - a bitmask indicating which node types to show (see NodeFilter constants).
 * @param {Function|null} filterFunction - An optional filter function to apply to nodes during iteration.
 * @throws {Error} Throws NotSupportedError if rootNode is not a valid DOM Node.
 */
function NodeIteratorLogger(rootNode, whatToShow, filterFunction) {
  // Validate that rootNode is a valid DOM Node
  if (!rootNode || !rootNode.nodeType) {
    zM2.NotSupportedError();
  }

  /**
   * @private
   * @type {Node}
   * The root node for iteration
   */
  this._root = rootNode;

  /**
   * @private
   * @type {Node}
   * The reference node for the iterator'createInteractionAccessor current position
   */
  this._referenceNode = rootNode;

  /**
   * @private
   * @type {boolean}
   * Indicates if the pointer is before the reference node
   */
  this._pointerBeforeReferenceNode = true;

  /**
   * @private
   * @type {number}
   * Bitmask specifying which node types to show
   */
  this._whatToShow = Number(whatToShow) || 0;

  /**
   * @private
   * @type {Function|null}
   * Optional filter function for node iteration
   */
  this._filter = filterFunction || null;

  /**
   * @private
   * @type {boolean}
   * Indicates if the iterator is currently active
   */
  this._active = false;

  // Attach this iterator to the document for tracking
  rootNode.doc._attachNodeIterator(this);
}

module.exports = NodeIteratorLogger;