/**
 * LoggingNodeIterator is a utility class that iterates over nodes in a DOM-like structure.
 * It validates the root node, sets up iteration parameters, and attaches itself to the document for tracking.
 *
 * @class
 * @param {Object} rootNode - The root node to start iteration from. Must have a nodeType property.
 * @param {number} whatToShow - a bitmask indicating which node types to show (defaults to 0 if falsy).
 * @param {Function|null} filterFunction - Optional filter function to apply to nodes during iteration.
 * @throws {Error} Throws NotSupportedError if rootNode is invalid.
 */
function LoggingNodeIterator(rootNode, whatToShow, filterFunction) {
  // Validate that rootNode is a valid node with a nodeType property
  if (!rootNode || !rootNode.nodeType) {
    zM2.NotSupportedError();
  }

  /**
   * The root node from which iteration starts.
   * @type {Object}
   */
  this._root = rootNode;

  /**
   * The current reference node in the iteration.
   * @type {Object}
   */
  this._referenceNode = rootNode;

  /**
   * Indicates if the pointer is before the reference node.
   * @type {boolean}
   */
  this._pointerBeforeReferenceNode = true;

  /**
   * Bitmask specifying which node types to show during iteration.
   * @type {number}
   */
  this._whatToShow = Number(whatToShow) || 0;

  /**
   * Optional filter function to apply to nodes.
   * @type {Function|null}
   */
  this._filter = filterFunction || null;

  /**
   * Indicates if the iterator is currently active.
   * @type {boolean}
   */
  this._active = false;

  // Attach this iterator to the document for tracking
  rootNode.doc._attachNodeIterator(this);
}

module.exports = LoggingNodeIterator;