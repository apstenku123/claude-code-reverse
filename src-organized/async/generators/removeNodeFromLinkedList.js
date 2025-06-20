/**
 * Removes a node from a doubly-linked list structure within a parent container.
 * Updates sibling and parent references to maintain list integrity.
 *
 * @param {Object} parentNode - The parent container object holding the linked list (with firstChild, lastChild, ownerDocument).
 * @param {Object} nodeToRemove - The node to be removed (with previousSibling, nextSibling, parentNode).
 * @returns {Object} The removed node, with its parent and sibling references cleared.
 */
function removeNodeFromLinkedList(parentNode, nodeToRemove) {
  const {
    previousSibling,
    nextSibling
  } = nodeToRemove;

  // Update the previous sibling'createInteractionAccessor next reference, or update parent'createInteractionAccessor firstChild if removing the first node
  if (previousSibling) {
    previousSibling.nextSibling = nextSibling;
  } else {
    parentNode.firstChild = nextSibling;
  }

  // Update the next sibling'createInteractionAccessor previous reference, or update parent'createInteractionAccessor lastChild if removing the last node
  if (nextSibling) {
    nextSibling.previousSibling = previousSibling;
  } else {
    parentNode.lastChild = previousSibling;
  }

  // Clear the removed node'createInteractionAccessor parent and sibling references
  nodeToRemove.parentNode = null;
  nodeToRemove.previousSibling = null;
  nodeToRemove.nextSibling = null;

  // Call external utility function, possibly to update document state
  incrementAndAppendChildNodes(parentNode.ownerDocument, parentNode);

  return nodeToRemove;
}

module.exports = removeNodeFromLinkedList;