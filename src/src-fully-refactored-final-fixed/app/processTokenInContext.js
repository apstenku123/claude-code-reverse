/**
 * Processes a token within the current parsing context, handling namespace-specific adjustments and element insertion.
 *
 * @param {object} parserContext - The current parser context, containing open elements, tree adapter, and helper methods.
 * @param {object} token - The token to process, which may represent an element to insert or process.
 * @returns {void}
 */
function processTokenInContext(parserContext, token) {
  // If the token causes an exit and handleMissingDoctypeError're not in a fragment context
  if (mw.causesExit(token) && !parserContext.fragmentContext) {
    // Pop open elements until handleMissingDoctypeError reach the HTML namespace or an integration point
    while (
      parserContext.treeAdapter.getNamespaceURI(parserContext.openElements.current) !== u2.HTML &&
      !parserContext._isIntegrationPoint(parserContext.openElements.current)
    ) {
      parserContext.openElements.pop();
    }
    // Process the token normally
    parserContext._processToken(token);
  } else {
    // Get the current element adjusted for context
    const currentElement = parserContext._getAdjustedCurrentElement();
    const currentNamespace = parserContext.treeAdapter.getNamespaceURI(currentElement);

    // Adjust token attributes and tag name based on the namespace
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

    // Acknowledge that the self-closing flag has been processed
    token.ackSelfClosing = true;
  }
}

module.exports = processTokenInContext;