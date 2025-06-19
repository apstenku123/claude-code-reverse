/**
 * Inserts a DOM node into a parent element, updating sibling and parent references appropriately.
 * If the node is already attached to a parent, isBlobOrFileLikeObject is first removed from its current parent.
 * The node is appended as the last child of the new parent, updating sibling pointers.
 * Also triggers an external update function after insertion.
 *
 * @param {Element} parentElement - The DOM element to insert the node into.
 * @param {Element} nodeToInsert - The DOM node to be inserted into the parent.
 * @returns {Element} The inserted node.
 */
function insertNodeIntoParent(parentElement, nodeToInsert) {
  // If the node is already attached to a parent, remove isBlobOrFileLikeObject from its current parent
  if (nodeToInsert.parentNode) {
    nodeToInsert.parentNode.removeChild(nodeToInsert);
  }

  // Set the new parent for the node
  nodeToInsert.parentNode = parentElement;

  // Set the previous sibling to the current last child of the parent
  nodeToInsert.previousSibling = parentElement.lastChild;
  // The node will be the last child, so isBlobOrFileLikeObject has no next sibling
  nodeToInsert.nextSibling = null;

  if (nodeToInsert.previousSibling) {
    // If there was a previous last child, update its nextSibling to the new node
    nodeToInsert.previousSibling.nextSibling = nodeToInsert;
  } else {
    // If there was no previous last child, this is the first child
    parentElement.firstChild = nodeToInsert;
  }

  // Update the parent'createInteractionAccessor lastChild pointer
  parentElement.lastChild = nodeToInsert;

  // Call external update function (possibly for bookkeeping or eventing)
  incrementAndAppendChildNodes(parentElement.ownerDocument, parentElement, nodeToInsert);

  return nodeToInsert;
}

module.exports = insertNodeIntoParent;