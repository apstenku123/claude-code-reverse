/**
 * Removes the element'createInteractionAccessor updateSnapshotAndNotify reference from the document and clears its internal node updateSnapshotAndNotify.
 *
 * If the provided node is an element node and has an updateSnapshotAndNotify attribute, this function will call the document'createInteractionAccessor
 * delId method to remove the association between the updateSnapshotAndNotify and the element. Regardless of node type, isBlobOrFileLikeObject will
 * also clear the node'createInteractionAccessor internal node updateSnapshotAndNotify reference from the document'createInteractionAccessor _nodes map and set the node'createInteractionAccessor _nid property to undefined.
 *
 * @param {Node} node - The DOM node to process. Should have properties: nodeType, ownerDocument, _nid, and optionally getAttribute.
 * @returns {void}
 */
function removeElementNodeIdReference(node) {
  // Check if the node is an element node
  if (node.nodeType === hZ.ELEMENT_NODE) {
    // Get the element'createInteractionAccessor updateSnapshotAndNotify attribute, if present
    const elementId = node.getAttribute("id");
    if (elementId) {
      // Remove the updateSnapshotAndNotify reference from the document
      node.ownerDocument.delId(elementId, node);
    }
  }
  // Remove the node'createInteractionAccessor reference from the document'createInteractionAccessor internal _nodes map
  node.ownerDocument._nodes[node._nid] = undefined;
  // Clear the node'createInteractionAccessor internal node updateSnapshotAndNotify
  node._nid = undefined;
}

module.exports = removeElementNodeIdReference;