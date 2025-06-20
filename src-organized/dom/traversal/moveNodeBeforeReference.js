/**
 * Moves a DOM node (nodeToMove) before a reference node (referenceNode) within a parent (parentNode),
 * handling document fragments and updating sibling/parent pointers accordingly.
 *
 * @param {Node} parentNode - The parent DOM node where the operation occurs.
 * @param {Node} nodeToMove - The DOM node (or fragment) to move.
 * @param {Node|null} referenceNode - The node before which nodeToMove will be inserted. If null, inserts at the end.
 * @param {Function} [customInsertHandler] - Optional custom function to handle insertion for DOCUMENT_NODEs.
 * @returns {Node} The moved node (nodeToMove).
 */
function moveNodeBeforeReference(parentNode, nodeToMove, referenceNode, customInsertHandler) {
  // Pre-processing or validation step
  validateMoveOperation(parentNode, nodeToMove, referenceNode);

  // If parentNode is a DOCUMENT_NODE, use a custom insert handler or default handler
  if (parentNode.nodeType === NODE_TYPE_CONSTANTS.DOCUMENT_NODE) {
    (customInsertHandler || defaultDocumentInsertHandler)(parentNode, nodeToMove, referenceNode);
  }

  // Remove nodeToMove from its current parent if isBlobOrFileLikeObject has one
  const currentParent = nodeToMove.parentNode;
  if (currentParent) {
    currentParent.removeChild(nodeToMove);
  }

  // If nodeToMove is a DocumentFragment, handle its children
  let firstNodeToInsert, lastNodeToInsert;
  if (nodeToMove.nodeType === NODE_TYPE_CONSTANTS.DOCUMENT_FRAGMENT_NODE) {
    firstNodeToInsert = nodeToMove.firstChild;
    if (firstNodeToInsert == null) {
      // Empty fragment, nothing to insert
      return nodeToMove;
    }
    lastNodeToInsert = nodeToMove.lastChild;
  } else {
    // Single node
    firstNodeToInsert = lastNodeToInsert = nodeToMove;
  }

  // Find the node that will precede the inserted nodes
  const previousSibling = referenceNode ? referenceNode.previousSibling : parentNode.lastChild;

  // Update sibling pointers for the nodes being inserted
  firstNodeToInsert.previousSibling = previousSibling;
  lastNodeToInsert.nextSibling = referenceNode;
  if (previousSibling) {
    previousSibling.nextSibling = firstNodeToInsert;
  } else {
    parentNode.firstChild = firstNodeToInsert;
  }

  if (referenceNode == null) {
    parentNode.lastChild = lastNodeToInsert;
  } else {
    referenceNode.previousSibling = lastNodeToInsert;
  }

  // Set parentNode for all inserted nodes
  let currentNode = firstNodeToInsert;
  do {
    currentNode.parentNode = parentNode;
  } while (currentNode !== lastNodeToInsert && (currentNode = currentNode.nextSibling));

  // Post-processing (e.g., mutation observer notification)
  notifyNodeMoved(parentNode.ownerDocument || parentNode, parentNode);

  // If nodeToMove was a fragment, clear its children
  if (nodeToMove.nodeType === NODE_TYPE_CONSTANTS.DOCUMENT_FRAGMENT_NODE) {
    nodeToMove.firstChild = nodeToMove.lastChild = null;
  }

  return nodeToMove;
}

module.exports = moveNodeBeforeReference;