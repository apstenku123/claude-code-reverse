/**
 * Represents a Document Type Node, initializing its properties and linking isBlobOrFileLikeObject to its owner document.
 *
 * @class DocumentTypeNode
 * @extends BL2
 *
 * @param {object} ownerDocument - The document that owns this node. Can be null if not attached.
 * @param {string} name - The name of the document type (e.g., 'html').
 * @param {string} [publicId] - The public identifier of the document type. Defaults to an empty string if not provided.
 * @param {string} [systemId] - The system identifier of the document type. Defaults to an empty string if not provided.
 */
function DocumentTypeNode(ownerDocument, name, publicId, systemId) {
  // Call the parent constructor (BL2) to initialize base properties
  BL2.call(this);

  // Set the node type to DOCUMENT_TYPE_NODE using the WC5 constants
  this.nodeType = WC5.DOCUMENT_TYPE_NODE;

  // Reference to the document that owns this node, or null if unattached
  this.ownerDocument = ownerDocument || null;

  // Name of the document type (e.g., 'html')
  this.name = name;

  // Public identifier for the document type, defaulting to an empty string
  this.publicId = publicId || "";

  // System identifier for the document type, defaulting to an empty string
  this.systemId = systemId || "";
}

module.exports = DocumentTypeNode;