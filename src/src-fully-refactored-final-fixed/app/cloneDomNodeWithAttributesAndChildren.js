/**
 * Clones a DOM node, copying its own properties, attributes, and (optionally) its child nodes.
 * This function creates a new node of the same type as the source, copies all own non-object properties,
 * handles attributes for element nodes, and recursively clones child nodes if specified.
 *
 * @param {Document} ownerDocument - The document context to associate with the cloned node.
 * @param {Node} sourceNode - The DOM node to clone, including its properties and children.
 * @param {boolean} [deepClone=false] - Whether to recursively clone child nodes.
 * @returns {Node} The cloned DOM node with copied properties, attributes, and optionally children.
 */
function cloneDomNodeWithAttributesAndChildren(ownerDocument, sourceNode, deepClone = false) {
  // Create a new node of the same type as sourceNode
  const clonedNode = new sourceNode.constructor();

  // Copy all own, non-object properties from sourceNode to clonedNode
  for (const propertyName in sourceNode) {
    if (Object.prototype.hasOwnProperty.call(sourceNode, propertyName)) {
      const propertyValue = sourceNode[propertyName];
      if (typeof propertyValue !== "object") {
        // Only copy if the value differs from the default
        if (propertyValue !== clonedNode[propertyName]) {
          clonedNode[propertyName] = propertyValue;
        }
      }
    }
  }

  // If the node has childNodes, initialize an empty childNodes collection
  if (sourceNode.childNodes) {
    clonedNode.childNodes = new renderToolUseConfirmationDialog$(); // renderToolUseConfirmationDialog$ is assumed to be a custom NodeList implementation
  }

  // Set the ownerDocument and handle node-type-specific logic
  clonedNode.ownerDocument = ownerDocument;
  switch (clonedNode.nodeType) {
    case jK: // jK is assumed to be the constant for ELEMENT_NODE
      // Copy attributes for element nodes
      const sourceAttributes = sourceNode.attributes;
      const clonedAttributes = clonedNode.attributes = new _K1(); // _K1 is assumed to be a custom NamedNodeMap implementation
      const attributeCount = sourceAttributes.length;
      clonedAttributes._ownerElement = clonedNode;
      // Recursively clone each attribute node
      for (let i = 0; i < attributeCount; i++) {
        clonedNode.setAttributeNode(
          cloneDomNodeWithAttributesAndChildren(ownerDocument, sourceAttributes.item(i), true)
        );
      }
      break;
    case Iu: // Iu is assumed to be the constant for DOCUMENT_TYPE_NODE or similar
      // Always deep clone for this node type
      deepClone = true;
      break;
  }

  // Recursively clone and append child nodes if deepClone is true
  if (deepClone) {
    let currentChild = sourceNode.firstChild;
    while (currentChild) {
      clonedNode.appendChild(
        cloneDomNodeWithAttributesAndChildren(ownerDocument, currentChild, deepClone)
      );
      currentChild = currentChild.nextSibling;
    }
  }

  return clonedNode;
}

module.exports = cloneDomNodeWithAttributesAndChildren;