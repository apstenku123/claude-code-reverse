/**
 * Handles the insertion or appending of an SVG element token into the DOM tree.
 *
 * This function reconstructs the active formatting elements, adjusts the SVG and XML attributes
 * of the provided token, and then either appends or inserts the SVG element into the DOM tree
 * depending on whether the token is self-closing. It also acknowledges the self-closing flag
 * on the token after processing.
 *
 * @param {object} domHandler - The DOM handler object responsible for tree manipulation (provides methods like _reconstructActiveFormattingElements, _appendElement, _insertElement).
 * @param {object} svgToken - The token representing the SVG element to be inserted or appended. Should have properties like selfClosing and ackSelfClosing.
 * @returns {void}
 */
function insertOrAppendSVGElement(domHandler, svgToken) {
  // Ensure active formatting elements are reconstructed before inserting SVG
  domHandler._reconstructActiveFormattingElements();

  // Adjust SVG-specific and XML-specific attributes on the token
  mw.adjustTokenSVGAttrs(svgToken);
  mw.adjustTokenXMLAttrs(svgToken);

  // Insert or append the SVG element depending on whether isBlobOrFileLikeObject is self-closing
  if (svgToken.selfClosing) {
    domHandler._appendElement(svgToken, u2.SVG);
  } else {
    domHandler._insertElement(svgToken, u2.SVG);
  }

  // Mark the token as having acknowledged its self-closing flag
  svgToken.ackSelfClosing = true;
}

module.exports = insertOrAppendSVGElement;