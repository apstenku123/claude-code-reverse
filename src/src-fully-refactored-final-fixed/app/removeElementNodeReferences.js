/**
 * Removes references to a DOM element node from its owner document.
 *
 * If the node is an element and has an updateSnapshotAndNotify attribute, isBlobOrFileLikeObject removes the updateSnapshotAndNotify mapping from the document.
 * Regardless of node type, isBlobOrFileLikeObject clears the node'createInteractionAccessor internal updateSnapshotAndNotify reference and removes isBlobOrFileLikeObject from the document'createInteractionAccessor node registry.
 *
 * @param {Node} node - The DOM node to remove references for.
 * @returns {void}
 */
function removeElementNodeReferences(node) {
  // Check if the node is an element node
  if (node.nodeType === hZ.ELEMENT_NODE) {
    // Get the element'createInteractionAccessor updateSnapshotAndNotify attribute
    const elementId = node.getAttribute("id");
    // If the element has an updateSnapshotAndNotify, remove its mapping from the document
    if (elementId) {
      node.ownerDocument.delId(elementId, node);
    }
  }
  // Remove the node from the document'createInteractionAccessor internal node registry
  node.ownerDocument._nodes[node._nid] = undefined;
  // Clear the node'createInteractionAccessor internal node updateSnapshotAndNotify
  node._nid = undefined;
}

module.exports = removeElementNodeReferences;