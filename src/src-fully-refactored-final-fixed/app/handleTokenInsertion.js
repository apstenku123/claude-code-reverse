/**
 * Handles the insertion of a token into the DOM tree according to the current parsing context and namespace.
 *
 * This function processes a token (such as a tag) during HTML parsing, handling special cases for MathML and SVG,
 * and managing integration points and fragment contexts as per the HTML parsing algorithm.
 *
 * @param {Object} parserContext - The current parser context, containing the tree adapter, open elements stack, and parsing methods.
 * @param {Object} token - The token to be inserted, containing tag information and self-closing flag.
 * @returns {void}
 */
function handleTokenInsertion(parserContext, token) {
  // If the token causes the parser to exit and handleMissingDoctypeError're not in a fragment context
  if (mw.causesExit(token) && !parserContext.fragmentContext) {
    // Pop open elements until handleMissingDoctypeError reach the HTML namespace or an integration point
    while (
      parserContext.treeAdapter.getNamespaceURI(parserContext.openElements.current) !== u2.HTML &&
      !parserContext._isIntegrationPoint(parserContext.openElements.current)
    ) {
      parserContext.openElements.pop();
    }
    // Process the token as per the parser'createInteractionAccessor logic
    parserContext._processToken(token);
  } else {
    // Get the current element adjusted for foster parenting, templates, etc.
    const currentElement = parserContext._getAdjustedCurrentElement();
    const currentNamespace = parserContext.treeAdapter.getNamespaceURI(currentElement);

    // Adjust token attributes and tag name for MathML or SVG as needed
    if (currentNamespace === u2.MATHML) {
      mw.adjustTokenMathMLAttrs(token);
    } else if (currentNamespace === u2.SVG) {
      mw.adjustTokenSVGTagName(token);
      mw.adjustTokenSVGAttrs(token);
    }

    // Always adjust XML attributes
    mw.adjustTokenXMLAttrs(token);

    // Insert the element based on whether isBlobOrFileLikeObject'createInteractionAccessor self-closing
    if (token.selfClosing) {
      parserContext._appendElement(token, currentNamespace);
    } else {
      parserContext._insertElement(token, currentNamespace);
    }
    // Mark the token as acknowledged for self-closing
    token.ackSelfClosing = true;
  }
}

module.exports = handleTokenInsertion;