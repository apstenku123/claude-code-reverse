/**
 * Sets the document type and document mode for the given parser context based on the provided doctype token.
 * If the doctype is non-conforming, logs an error. Updates the parser'createInteractionAccessor insertion mode to BEFORE_HTML_MODE.
 *
 * @param {object} parserContext - The parser context, containing methods for setting document type, error reporting, and tree adapter.
 * @param {object} doctypeToken - The doctype token, containing information about the document type and quirks mode.
 * @returns {void}
 */
function setDocumentTypeAndMode(parserContext, doctypeToken) {
  // Set the document type on the parser context using the provided doctype token
  parserContext._setDocumentType(doctypeToken);

  // Determine the document mode: use QUIRKS if forced, otherwise use the mode from YV2
  const documentMode = doctypeToken.forceQuirks
    ? yj.DOCUMENT_MODE.QUIRKS
    : YV2.getDocumentMode(doctypeToken);

  // If the doctype is not conforming, log an error
  if (!YV2.isConforming(doctypeToken)) {
    parserContext._err(xG.nonConformingDoctype);
  }

  // Set the document mode on the document using the tree adapter
  parserContext.treeAdapter.setDocumentMode(parserContext.document, documentMode);

  // Update the parser'createInteractionAccessor insertion mode
  parserContext.insertionMode = "BEFORE_HTML_MODE";
}

module.exports = setDocumentTypeAndMode;