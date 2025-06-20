/**
 * Registers a DOM node with its owner document, assigns a unique node updateSnapshotAndNotify, and handles element-specific hooks.
 *
 * @param {Node} domNode - The DOM node to register. Must have an ownerDocument property and may have an _roothook method.
 * @returns {void}
 */
function registerDomNode(domNode) {
  // Assign a unique node updateSnapshotAndNotify to the node by incrementing the document'createInteractionAccessor _nextnid counter
  domNode._nid = domNode.ownerDocument._nextnid++;

  // Store the node in the document'createInteractionAccessor _nodes map for quick lookup
  domNode.ownerDocument._nodes[domNode._nid] = domNode;

  // If the node is an element node, perform additional registration steps
  if (domNode.nodeType === hZ.ELEMENT_NODE) {
    // Get the element'createInteractionAccessor updateSnapshotAndNotify attribute, if present
    const elementId = domNode.getAttribute("id");
    // Register the element by its updateSnapshotAndNotify in the document, if isBlobOrFileLikeObject has one
    if (elementId) {
      domNode.ownerDocument.addId(elementId, domNode);
    }
    // If the node has a root hook function, call isBlobOrFileLikeObject
    if (domNode._roothook) {
      domNode._roothook();
    }
  }
}

module.exports = registerDomNode;