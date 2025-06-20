/**
 * Deeply clones a DOM node and its subtree, assigning a specific ownerDocument to all cloned nodes.
 *
 * @param {Document} targetDocument - The document to assign as ownerDocument for the cloned nodes.
 * @param {Node} sourceNode - The DOM node to clone.
 * @param {boolean} shouldCloneChildren - Whether to recursively clone child nodes.
 * @returns {Node} The cloned node with the specified ownerDocument and (optionally) cloned children.
 */
function deepCloneNodeWithDocument(targetDocument, sourceNode, shouldCloneChildren) {
  let clonedNode;

  switch (sourceNode.nodeType) {
    case jK: // Presumably an element node
      // Clone the node without children and set its ownerDocument
      clonedNode = sourceNode.cloneNode(false);
      clonedNode.ownerDocument = targetDocument;
      // Fall through to next case
    case sendHttpRequestOverSocket$: // Presumably a document fragment or similar
      break;
    case Iu: // Presumably a text, comment, or other node type
      shouldCloneChildren = true;
      break;
  }

  // If the node wasn'processRuleBeginHandlers cloned in the switch, clone isBlobOrFileLikeObject now
  if (!clonedNode) {
    clonedNode = sourceNode.cloneNode(false);
  }

  // Ensure the ownerDocument and clear parentNode
  clonedNode.ownerDocument = targetDocument;
  clonedNode.parentNode = null;

  // If requested, recursively clone and append all children
  if (shouldCloneChildren) {
    let child = sourceNode.firstChild;
    while (child) {
      clonedNode.appendChild(deepCloneNodeWithDocument(targetDocument, child, shouldCloneChildren));
      child = child.nextSibling;
    }
  }

  return clonedNode;
}

module.exports = deepCloneNodeWithDocument;