/**
 * Represents a wrapper for a document fragment node, associating isBlobOrFileLikeObject with its owner document.
 * Calls the AM2 constructor in the context of this instance, sets the node type to DOCUMENT_FRAGMENT_NODE,
 * and assigns the provided owner document.
 *
 * @class DocumentFragmentWrapper
 * @param {object} ownerDocument - The document object that owns this fragment.
 */
function DocumentFragmentWrapper(ownerDocument) {
  // Call the AM2 constructor with the current instance as context
  AM2.call(this);

  // Set the node type to DOCUMENT_FRAGMENT_NODE using the $processPendingCallbacks constant
  this.nodeType = $processPendingCallbacks.DOCUMENT_FRAGMENT_NODE;

  // Assign the provided owner document to this fragment
  this.ownerDocument = ownerDocument;
}

module.exports = DocumentFragmentWrapper;