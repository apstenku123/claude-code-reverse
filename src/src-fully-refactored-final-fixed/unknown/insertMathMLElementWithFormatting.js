/**
 * Inserts a MathML element into the document tree, ensuring active formatting elements are reconstructed
 * and token attributes are properly adjusted for MathML and XML. Handles self-closing elements appropriately.
 *
 * @param {Object} documentHandler - The handler or context managing the document tree. Must implement:
 *   - _reconstructActiveFormattingElements()
 *   - _appendElement(elementToken, namespace)
 *   - _insertElement(elementToken, namespace)
 * @param {Object} elementToken - The token representing the MathML element to insert. Should have:
 *   - selfClosing {boolean}: Whether the element is self-closing
 *   - ackSelfClosing {boolean}: Will be set to true after processing
 *
 * @returns {void}
 */
function insertMathMLElementWithFormatting(documentHandler, elementToken) {
  // Ensure active formatting elements are reconstructed before insertion
  documentHandler._reconstructActiveFormattingElements();

  // Adjust the token'createInteractionAccessor attributes for MathML and XML compliance
  mw.adjustTokenMathMLAttrs(elementToken);
  mw.adjustTokenXMLAttrs(elementToken);

  // Insert the element into the document tree, handling self-closing logic
  if (elementToken.selfClosing) {
    documentHandler._appendElement(elementToken, u2.MATHML);
  } else {
    documentHandler._insertElement(elementToken, u2.MATHML);
  }

  // Mark the token as having been acknowledged as self-closing
  elementToken.ackSelfClosing = true;
}

module.exports = insertMathMLElementWithFormatting;