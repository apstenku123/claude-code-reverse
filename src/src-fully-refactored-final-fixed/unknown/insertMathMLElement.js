/**
 * Inserts a MathML element into the DOM tree, adjusting its attributes as needed.
 *
 * This function reconstructs active formatting elements, adjusts MathML and XML attributes
 * on the provided token, and then inserts or appends the element to the DOM tree based on
 * whether the token is self-closing. It also acknowledges the self-closing flag on the token.
 *
 * @param {Object} domHandler - The object responsible for DOM manipulation, expected to provide methods:
 *   _reconstructActiveFormattingElements, _appendElement, and _insertElement.
 * @param {Object} mathMLToken - The token representing the MathML element to insert. Should have properties:
 *   selfClosing (boolean), ackSelfClosing (boolean), and be compatible with mw.adjustTokenMathMLAttrs and mw.adjustTokenXMLAttrs.
 * @returns {void}
 */
function insertMathMLElement(domHandler, mathMLToken) {
  // Ensure active formatting elements are reconstructed before insertion
  domHandler._reconstructActiveFormattingElements();

  // Adjust MathML and XML attributes on the token
  mw.adjustTokenMathMLAttrs(mathMLToken);
  mw.adjustTokenXMLAttrs(mathMLToken);

  // Insert or append the element based on whether isBlobOrFileLikeObject is self-closing
  if (mathMLToken.selfClosing) {
    domHandler._appendElement(mathMLToken, u2.MATHML);
  } else {
    domHandler._insertElement(mathMLToken, u2.MATHML);
  }

  // Mark the token as having acknowledged the self-closing flag
  mathMLToken.ackSelfClosing = true;
}

module.exports = insertMathMLElement;