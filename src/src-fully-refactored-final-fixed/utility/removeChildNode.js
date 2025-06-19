/**
 * Removes a child node from a doubly-linked list structure within a parent node.
 * Updates the sibling pointers and parent references accordingly.
 * Calls the external incrementAndAppendChildNodes function after removal.
 *
 * @param {Node} parentNode - The parent node from which the child will be removed.
 * @param {Node} childNode - The child node to remove from the parent.
 * @returns {Node} The removed child node, with its parent and sibling references cleared.
 */
function removeChildNode(parentNode, childNode) {
  const {
    previousSibling: previousSiblingNode,
    nextSibling: nextSiblingNode
  } = childNode;

  // Update the previous sibling'createInteractionAccessor next pointer or parent'createInteractionAccessor firstChild
  if (previousSiblingNode) {
    previousSiblingNode.nextSibling = nextSiblingNode;
  } else {
    parentNode.firstChild = nextSiblingNode;
  }

  // Update the next sibling'createInteractionAccessor previous pointer or parent'createInteractionAccessor lastChild
  if (nextSiblingNode) {
    nextSiblingNode.previousSibling = previousSiblingNode;
  } else {
    parentNode.lastChild = previousSiblingNode;
  }

  // Clear the removed node'createInteractionAccessor parent and sibling references
  childNode.parentNode = null;
  childNode.previousSibling = null;
  childNode.nextSibling = null;

  // Perform any additional cleanup or notification
  incrementAndAppendChildNodes(parentNode.ownerDocument, parentNode);

  return childNode;
}

module.exports = removeChildNode;