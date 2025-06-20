/**
 * Inserts an SVG element into the DOM tree with adjusted SVG and XML attributes.
 * Handles self-closing elements appropriately and marks them as acknowledged.
 *
 * @param {Object} treeAdapter - The object responsible for DOM tree manipulation (e.g., parser instance).
 * @param {Object} svgToken - The token representing the SVG element to insert. Should have 'selfClosing' property.
 * @returns {void}
 */
function insertSvgElementWithAdjustedAttributes(treeAdapter, svgToken) {
  // Ensure active formatting elements are reconstructed before insertion
  treeAdapter._reconstructActiveFormattingElements();

  // Adjust SVG and XML attributes on the token before insertion
  mw.adjustTokenSVGAttrs(svgToken);
  mw.adjustTokenXMLAttrs(svgToken);

  // Insert the SVG element into the DOM tree
  if (svgToken.selfClosing) {
    // For self-closing elements, append and use SVG namespace
    treeAdapter._appendElement(svgToken, u2.SVG);
  } else {
    // For normal elements, insert and use SVG namespace
    treeAdapter._insertElement(svgToken, u2.SVG);
  }

  // Mark the self-closing flag as acknowledged
  svgToken.ackSelfClosing = true;
}

module.exports = insertSvgElementWithAdjustedAttributes;