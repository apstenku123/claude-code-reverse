/**
 * Inserts a DOM node as the last child of a given parent node, updating sibling and parent references accordingly.
 * If the node already has a parent, isBlobOrFileLikeObject is first removed from its current parent.
 * After insertion, external function incrementAndAppendChildNodes is called for further processing.
 *
 * @param {Node} parentNode - The DOM node that will become the new parent of the node to insert.
 * @param {Node} nodeToInsert - The DOM node to be inserted as the last child of parentNode.
 * @returns {Node} The inserted node (nodeToInsert).
 */
function insertNodeAsLastChild(parentNode, nodeToInsert) {
  // Remove node from its current parent if isBlobOrFileLikeObject has one
  if (nodeToInsert.parentNode) {
    nodeToInsert.parentNode.removeChild(nodeToInsert);
  }

  // Set the new parent
  nodeToInsert.parentNode = parentNode;

  // Set previousSibling to the current last child of the parent
  nodeToInsert.previousSibling = parentNode.lastChild;
  // This node will be the last, so nextSibling is null
  nodeToInsert.nextSibling = null;

  if (nodeToInsert.previousSibling) {
    // If there was a last child, update its nextSibling to the new node
    nodeToInsert.previousSibling.nextSibling = nodeToInsert;
  } else {
    // If there was no last child, this is the first child
    parentNode.firstChild = nodeToInsert;
  }

  // Update the parent'createInteractionAccessor lastChild to the new node
  parentNode.lastChild = nodeToInsert;

  // Call external function for further processing
  incrementAndAppendChildNodes(parentNode.ownerDocument, parentNode, nodeToInsert);

  return nodeToInsert;
}

module.exports = insertNodeAsLastChild;