/**
 * Removes a child node from a doubly-linked list structure and updates its siblings and parent references accordingly.
 * Also triggers a document update via the incrementAndAppendChildNodes function.
 *
 * @param {Node} parentNode - The parent node from which the child will be removed.
 * @param {Node} childNode - The child node to remove from the parent'createInteractionAccessor linked list of children.
 * @returns {Node} The removed child node, now detached from its parent and siblings.
 */
function removeChildNodeFromLinkedList(parentNode, childNode) {
  const { previousSibling, nextSibling } = childNode;

  // Update the previous sibling'createInteractionAccessor next pointer or parent'createInteractionAccessor firstChild
  if (previousSibling) {
    previousSibling.nextSibling = nextSibling;
  } else {
    parentNode.firstChild = nextSibling;
  }

  // Update the next sibling'createInteractionAccessor previous pointer or parent'createInteractionAccessor lastChild
  if (nextSibling) {
    nextSibling.previousSibling = previousSibling;
  } else {
    parentNode.lastChild = previousSibling;
  }

  // Detach the child node from its parent and siblings
  childNode.parentNode = null;
  childNode.previousSibling = null;
  childNode.nextSibling = null;

  // Trigger a document update (side effect)
  incrementAndAppendChildNodes(parentNode.ownerDocument, parentNode);

  return childNode;
}

module.exports = removeChildNodeFromLinkedList;