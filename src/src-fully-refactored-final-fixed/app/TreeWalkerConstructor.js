/**
 * Initializes a TreeWalker-like object for traversing a DOM tree.
 * Throws an error if the provided root node is invalid.
 *
 * @class
 * @param {Node} rootNode - The root node of the DOM tree to traverse. Must be a valid Node.
 * @param {number} whatToShow - Bitmask specifying which node types to show (see NodeFilter constants).
 * @param {Function|null} nodeFilter - Optional filter function to apply to nodes during traversal.
 * @throws {Error} If rootNode is not a valid DOM Node.
 */
function TreeWalkerConstructor(rootNode, whatToShow, nodeFilter) {
  // Validate that rootNode is a DOM Node
  if (!rootNode || !rootNode.nodeType) {
    JM2.NotSupportedError();
  }

  /**
   * The root node of the tree to traverse.
   * @type {Node}
   */
  this._root = rootNode;

  /**
   * Bitmask specifying which node types to show.
   * Defaults to 0 if not provided or not a number.
   * @type {number}
   */
  this._whatToShow = Number(whatToShow) || 0;

  /**
   * Optional filter function to apply to nodes.
   * @type {Function|null}
   */
  this._filter = nodeFilter || null;

  /**
   * Indicates if the walker is currently active.
   * @type {boolean}
   */
  this._active = false;

  /**
   * The current node in the traversal, initialized to the root node.
   * @type {Node}
   */
  this._currentNode = rootNode;
}

module.exports = TreeWalkerConstructor;