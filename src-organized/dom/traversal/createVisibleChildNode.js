/**
 * Creates a new child node with 'visible' mode and links isBlobOrFileLikeObject to its parent node.
 *
 * @param {Object} parentNode - The parent node to which the new child will be attached.
 * @param {Object} childContent - The content or children to be included in the new child node.
 * @returns {Object} The newly created child node, now linked to its parent.
 */
function createVisibleChildNode(parentNode, childContent) {
  // Create a new child node with mode 'visible' and provided children
  const newChildNode = copyObjectExcludingProperties({
    mode: "visible",
    children: childContent
  }, parentNode.mode, 0, null);

  // Link the new child node back to its parent
  newChildNode.return = parentNode;

  // Attach the new child node as the parent'createInteractionAccessor child
  parentNode.child = newChildNode;

  return newChildNode;
}

module.exports = createVisibleChildNode;