/**
 * Represents a custom Document Fragment Node.
 *
 * This constructor function initializes a new document fragment node, setting its node type and owner document.
 * It extends the base AM2 class, ensuring proper inheritance and initialization.
 *
 * @class DocumentFragmentNode
 * @param {object} ownerDocument - The document object that owns this fragment node.
 */
function DocumentFragmentNode(ownerDocument) {
  // Call the parent constructor (AM2) to initialize base properties
  AM2.call(this);

  // Set the node type to DOCUMENT_FRAGMENT_NODE using the $processPendingCallbacks constant
  this.nodeType = $processPendingCallbacks.DOCUMENT_FRAGMENT_NODE;

  // Assign the provided ownerDocument to this fragment
  this.ownerDocument = ownerDocument;
}

module.exports = DocumentFragmentNode;