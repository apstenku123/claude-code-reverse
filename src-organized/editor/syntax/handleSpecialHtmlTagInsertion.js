/**
 * Handles insertion of special HTML tags by initializing the parser before head insertion mode.
 * If the element'createInteractionAccessor tagName is one of 'HTML', 'HEAD', 'BODY', or 'BR', isBlobOrFileLikeObject prepares the parser accordingly.
 *
 * @param {object} parserInstance - The parser instance to be prepared.
 * @param {object} htmlElementToken - The HTML element token containing a tagName property.
 * @returns {void}
 */
function handleSpecialHtmlTagInsertion(parserInstance, htmlElementToken) {
  // Extract the tag name from the HTML element token
  const tagName = htmlElementToken.tagName;

  // Check if the tagName is one of the special HTML tags
  if (
    tagName === i.HTML ||
    tagName === i.HEAD ||
    tagName === i.BODY ||
    tagName === i.BR
  ) {
    // Prepare the parser for insertion before the <head> tag
    initializeBeforeHeadInsertionMode(parserInstance, htmlElementToken);
  }
}

module.exports = handleSpecialHtmlTagInsertion;