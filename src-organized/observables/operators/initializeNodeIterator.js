/**
 * Initializes a NodeIterator-like object for traversing a DOM-like tree structure.
 *
 * @param {Object} rootNode - The root node from which to start iteration. Must have a nodeType property.
 * @param {number} whatToShow - a bitmask indicating which node types to show (see NodeFilter constants).
 * @param {Function|null} filterCallback - An optional filter function to apply to nodes during iteration.
 * @throws {Error} Throws NotSupportedError if rootNode is invalid.
 */
function initializeNodeIterator(rootNode, whatToShow, filterCallback) {
  // Validate that the rootNode is a valid node
  if (!rootNode || !rootNode.nodeType) {
    zM2.NotSupportedError();
  }

  // Set up iterator state
  this._root = rootNode;
  this._referenceNode = rootNode;
  this._pointerBeforeReferenceNode = true;
  this._whatToShow = Number(whatToShow) || 0;
  this._filter = filterCallback || null;
  this._active = false;

  // Attach this iterator to the document for tracking
  rootNode.doc._attachNodeIterator(this);
}

module.exports = initializeNodeIterator;