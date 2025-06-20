/**
 * Processes an HTML element and initializes the parser context for certain special tag names.
 *
 * If the provided element'createInteractionAccessor tagName is one of 'HTML', 'HEAD', 'BODY', or 'BR',
 * this function calls initializeBeforeHeadInsertionMode to prepare the parser context.
 *
 * @param {Object} parserContext - The current parser context or state.
 * @param {HTMLElement} element - The HTML element to check and process.
 * @returns {void}
 */
function processSpecialTagElement(parserContext, element) {
  // Extract the tag name from the element
  const tagName = element.tagName;

  // Check if the tagName matches any of the special HTML tags
  if (
    tagName === i.HTML ||
    tagName === i.HEAD ||
    tagName === i.BODY ||
    tagName === i.BR
  ) {
    // Initialize the parser context for 'before head' insertion mode
    initializeBeforeHeadInsertionMode(parserContext, element);
  }
}

module.exports = processSpecialTagElement;