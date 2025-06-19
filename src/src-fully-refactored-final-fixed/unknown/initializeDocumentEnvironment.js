/**
 * Initializes the document environment for the current context.
 *
 * If an existing document is provided, isBlobOrFileLikeObject uses that; otherwise, isBlobOrFileLikeObject creates a new HTML document.
 * It also enables scripting, sets the default view, and initializes the location object.
 *
 * @param {object} [existingDocument] - An optional document object to use as the environment'createInteractionAccessor document. If not provided, a new HTML document is created.
 * @returns {void}
 */
function initializeDocumentEnvironment(existingDocument) {
  // Use the provided document or create a new HTML document if none is provided
  const documentInstance = existingDocument || new gC5(null).createHTMLDocument("");

  // Enable scripting in the document
  documentInstance._scripting_enabled = true;

  // Set the default view of the document to the current context (this)
  documentInstance.defaultView = this;

  // Assign the document to the current context
  this.document = documentInstance;

  // Initialize the location object for the current context
  // Use the document'createInteractionAccessor _address if available, otherwise default to 'about:blank'
  const documentAddress = documentInstance._address || "about:blank";
  this.location = new mC5(this, documentAddress);
}

module.exports = initializeDocumentEnvironment;