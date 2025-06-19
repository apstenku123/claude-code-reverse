/**
 * Initializes a TreeWalker-like object with the specified root node, filter, and whatToShow mask.
 * Throws a NotSupportedError if the root node is invalid.
 *
 * @param {Node} rootNode - The root node from which the traversal begins. Must be a valid DOM Node.
 * @param {number} whatToShow - a bitmask indicating which node types to show. Defaults to 0 if not provided or invalid.
 * @param {Function|null} nodeFilter - An optional filter function to apply to nodes during traversal. Defaults to null.
 * @returns {void}
 */
function initializeTreeWalker(rootNode, whatToShow, nodeFilter) {
  // Validate that the rootNode is a valid DOM Node
  if (!rootNode || !rootNode.nodeType) {
    JM2.NotSupportedError();
  }

  // Set the root node for traversal
  this._root = rootNode;

  // Set the whatToShow bitmask, defaulting to 0 if not a valid number
  this._whatToShow = Number(whatToShow) || 0;

  // Set the node filter, defaulting to null if not provided
  this._filter = nodeFilter || null;

  // Internal state: indicates if the walker is currently active
  this._active = false;

  // Set the current node to the root node initially
  this._currentNode = rootNode;
}

module.exports = initializeTreeWalker;