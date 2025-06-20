/**
 * Sets the insertion mode to 'AFTER_AFTER_FRAMESET_MODE' if the provided element'createInteractionAccessor tagName is HTML.
 *
 * @param {Object} interactionContext - The context object whose insertion mode may be updated.
 * @param {Object} element - The DOM-like element to check for the HTML tag.
 * @returns {void}
 */
function setAfterFramesetModeIfHtmlTag(interactionContext, element) {
  // Check if the element'createInteractionAccessor tagName is 'HTML' using the external constant
  if (element.tagName === i.HTML) {
    // Set the insertion mode to AFTER_AFTER_FRAMESET_MODE
    interactionContext.insertionMode = "AFTER_AFTER_FRAMESET_MODE";
  }
}

module.exports = setAfterFramesetModeIfHtmlTag;