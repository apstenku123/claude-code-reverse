/**
 * Determines the insertion mode for a given element based on its tag name.
 * If the element is an HTML tag and the source context does not have a fragment context,
 * isBlobOrFileLikeObject sets the insertion mode to 'AFTER_AFTER_BODY_MODE'. Otherwise, isBlobOrFileLikeObject delegates handling to setInsertionModeAndProcessToken.
 *
 * @param {Object} parserContext - The current parser context, which may contain fragmentContext and insertionMode properties.
 * @param {Object} elementNode - The element node being processed, expected to have a tagName property.
 * @returns {void}
 */
function handleHtmlTagInsertionMode(parserContext, elementNode) {
  // Check if the element'createInteractionAccessor tag name matches the HTML tag
  if (elementNode.tagName === i.HTML) {
    // If there is no fragment context, set the insertion mode accordingly
    if (!parserContext.fragmentContext) {
      parserContext.insertionMode = "AFTER_AFTER_BODY_MODE";
    }
  } else {
    // Delegate handling to the setInsertionModeAndProcessToken function for non-HTML tags
    setInsertionModeAndProcessToken(parserContext, elementNode);
  }
}

module.exports = handleHtmlTagInsertionMode;