/**
 * Inserts or moves a DOM node into a new position within a parent node, handling document fragments and sibling relationships.
 *
 * @param {Node} parentNode - The parent DOM node where the insertion or move will occur.
 * @param {Node} nodeToInsert - The DOM node (or DocumentFragment) to insert or move.
 * @param {Node|null} referenceNode - The node before which nodeToInsert will be inserted. If null, nodeToInsert is appended at the end.
 * @param {Function} [customInsertHandler] - Optional custom handler function for document node insertion.
 * @returns {Node} The inserted or moved node.
 */
function insertOrMoveNode(parentNode, nodeToInsert, referenceNode, customInsertHandler) {
  // Pre-insertion hook or validation
  validateParentChildRelationship(parentNode, nodeToInsert, referenceNode);

  // If the parent is a DOCUMENT_NODE, use a custom handler or default handler
  if (parentNode.nodeType === Q8.DOCUMENT_NODE) {
    (customInsertHandler || validateNodeInsertion)(parentNode, nodeToInsert, referenceNode);
  }

  // Remove nodeToInsert from its current parent if isBlobOrFileLikeObject has one
  const currentParent = nodeToInsert.parentNode;
  if (currentParent) {
    currentParent.removeChild(nodeToInsert);
  }

  // Handle DocumentFragment: set first and last child, otherwise nodeToInsert is both
  let firstNode, lastNode;
  if (nodeToInsert.nodeType === sendHttpRequestOverSocket$) { // sendHttpRequestOverSocket$ is likely Node.DOCUMENT_FRAGMENT_NODE
    firstNode = nodeToInsert.firstChild;
    if (firstNode == null) {
      return nodeToInsert;
    }
    lastNode = nodeToInsert.lastChild;
  } else {
    firstNode = lastNode = nodeToInsert;
  }

  // Find the previous sibling for insertion
  const previousSibling = referenceNode ? referenceNode.previousSibling : parentNode.lastChild;

  // Update sibling pointers for the fragment or node
  firstNode.previousSibling = previousSibling;
  lastNode.nextSibling = referenceNode;
  if (previousSibling) {
    previousSibling.nextSibling = firstNode;
  } else {
    parentNode.firstChild = firstNode;
  }
  if (referenceNode == null) {
    parentNode.lastChild = lastNode;
  } else {
    referenceNode.previousSibling = lastNode;
  }

  // Set parentNode for all nodes in the fragment (or just the node)
  let currentNode = firstNode;
  do {
    currentNode.parentNode = parentNode;
  } while (currentNode !== lastNode && (currentNode = currentNode.nextSibling));

  // Post-insertion hook or validation
  incrementAndAppendChildNodes(parentNode.ownerDocument || parentNode, parentNode);

  // If nodeToInsert was a DocumentFragment, clear its children
  if (nodeToInsert.nodeType === sendHttpRequestOverSocket$) {
    nodeToInsert.firstChild = nodeToInsert.lastChild = null;
  }

  return nodeToInsert;
}

module.exports = insertOrMoveNode;