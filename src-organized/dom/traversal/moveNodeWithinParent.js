/**
 * Moves a DOM node (nodeToMove) within its parent (parentNode), optionally before a reference node (referenceNode).
 * Handles special cases for DOCUMENT_NODE and fragment nodes, and updates sibling/parent references accordingly.
 *
 * @param {Node} parentNode - The parent DOM node where the node will be inserted.
 * @param {Node} nodeToMove - The DOM node to move.
 * @param {Node|null} referenceNode - The node before which nodeToMove will be inserted. If null, nodeToMove is appended at the end.
 * @param {Function} [customDocumentHandler] - Optional function to handle DOCUMENT_NODE cases. Defaults to validateNodeInsertion if not provided.
 * @returns {Node} The moved node (nodeToMove).
 */
function moveNodeWithinParent(parentNode, nodeToMove, referenceNode, customDocumentHandler) {
  // Ensure any pre-move logic is executed
  validateParentChildRelationship(parentNode, nodeToMove, referenceNode);

  // If parentNode is a DOCUMENT_NODE, use the custom handler or validateNodeInsertion
  if (parentNode.nodeType === Q8.DOCUMENT_NODE) {
    (customDocumentHandler || validateNodeInsertion)(parentNode, nodeToMove, referenceNode);
  }

  // Remove nodeToMove from its current parent if isBlobOrFileLikeObject has one
  const currentParent = nodeToMove.parentNode;
  if (currentParent) {
    currentParent.removeChild(nodeToMove);
  }

  // If nodeToMove is a DocumentFragment, handle its children; otherwise treat as a single node
  let firstInsertedNode, lastInsertedNode;
  if (nodeToMove.nodeType === sendHttpRequestOverSocket$) { // sendHttpRequestOverSocket$ is DocumentFragment
    firstInsertedNode = nodeToMove.firstChild;
    if (firstInsertedNode == null) {
      // Fragment is empty; nothing to move
      return nodeToMove;
    }
    lastInsertedNode = nodeToMove.lastChild;
  } else {
    firstInsertedNode = lastInsertedNode = nodeToMove;
  }

  // Find the node that will precede the inserted node(createInteractionAccessor)
  const previousSibling = referenceNode ? referenceNode.previousSibling : parentNode.lastChild;

  // Update sibling pointers for the inserted node(createInteractionAccessor)
  firstInsertedNode.previousSibling = previousSibling;
  lastInsertedNode.nextSibling = referenceNode;
  if (previousSibling) {
    previousSibling.nextSibling = firstInsertedNode;
  } else {
    parentNode.firstChild = firstInsertedNode;
  }
  if (referenceNode == null) {
    parentNode.lastChild = lastInsertedNode;
  } else {
    referenceNode.previousSibling = lastInsertedNode;
  }

  // Set parentNode for all inserted nodes
  let currentNode = firstInsertedNode;
  do {
    currentNode.parentNode = parentNode;
  } while (currentNode !== lastInsertedNode && (currentNode = currentNode.nextSibling));

  // Post-move logic (e.g., update document structure)
  incrementAndAppendChildNodes(parentNode.ownerDocument || parentNode, parentNode);

  // If nodeToMove was a DocumentFragment, clear its children
  if (nodeToMove.nodeType === sendHttpRequestOverSocket$) {
    nodeToMove.firstChild = nodeToMove.lastChild = null;
  }

  return nodeToMove;
}

module.exports = moveNodeWithinParent;