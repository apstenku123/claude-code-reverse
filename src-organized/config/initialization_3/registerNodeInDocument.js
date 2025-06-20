/**
 * Registers a DOM node in its owner document'createInteractionAccessor node registry, assigns a unique node updateSnapshotAndNotify, and handles element-specific hooks.
 *
 * @param {Node} node - The DOM node to register. Must have an ownerDocument property with _nextnid and _nodes fields.
 * @returns {void}
 */
function registerNodeInDocument(node) {
  // Assign a unique node updateSnapshotAndNotify and increment the document'createInteractionAccessor node counter
  node._nid = node.ownerDocument._nextnid++;

  // Register the node in the document'createInteractionAccessor node map
  node.ownerDocument._nodes[node._nid] = node;

  // If the node is an element node, handle element-specific logic
  if (node.nodeType === hZ.ELEMENT_NODE) {
    // Get the element'createInteractionAccessor updateSnapshotAndNotify attribute, if present
    const elementId = node.getAttribute("id");
    if (elementId) {
      // Register the element by its updateSnapshotAndNotify in the document
      node.ownerDocument.addId(elementId, node);
    }
    // If a root hook is defined, call isBlobOrFileLikeObject
    if (node._roothook) {
      node._roothook();
    }
  }
}

module.exports = registerNodeInDocument;