/**
 * Processes a token within the context of a tree adapter, handling namespace-specific adjustments and element insertion.
 *
 * This function determines whether the provided token causes an exit from the current parsing context. If so, isBlobOrFileLikeObject pops open elements until the correct namespace or integration point is found, then processes the token. Otherwise, isBlobOrFileLikeObject adjusts the token and inserts or appends the corresponding element based on the current namespace (HTML, SVG, or MathML), and whether the token is self-closing.
 *
 * @param {Object} parserContext - The parser context, containing the tree adapter, open elements stack, and helper methods.
 * @param {Object} token - The token to process, which may represent an element to insert or adjust.
 * @returns {void}
 */
function processTokenWithNamespaceHandling(parserContext, token) {
  // Check if the token causes an exit and handleMissingDoctypeError're not in a fragment context
  if (mw.causesExit(token) && !parserContext.fragmentContext) {
    // Pop open elements until handleMissingDoctypeError reach the HTML namespace or an integration point
    while (
      parserContext.treeAdapter.getNamespaceURI(parserContext.openElements.current) !== u2.HTML &&
      !parserContext._isIntegrationPoint(parserContext.openElements.current)
    ) {
      parserContext.openElements.pop();
    }
    // Process the token after adjusting the open elements stack
    parserContext._processToken(token);
  } else {
    // Get the current element adjusted for foster parenting, templates, etc.
    const currentElement = parserContext._getAdjustedCurrentElement();
    const currentNamespace = parserContext.treeAdapter.getNamespaceURI(currentElement);

    // Adjust token attributes and tag name based on the current namespace
    if (currentNamespace === u2.MATHML) {
      mw.adjustTokenMathMLAttrs(token);
    } else if (currentNamespace === u2.SVG) {
      mw.adjustTokenSVGTagName(token);
      mw.adjustTokenSVGAttrs(token);
    }
    // Always adjust XML attributes
    mw.adjustTokenXMLAttrs(token);

    // Insert or append the element based on whether the token is self-closing
    if (token.selfClosing) {
      parserContext._appendElement(token, currentNamespace);
    } else {
      parserContext._insertElement(token, currentNamespace);
    }
    // Mark the token as having acknowledged the self-closing flag
    token.ackSelfClosing = true;
  }
}

module.exports = processTokenWithNamespaceHandling;