/**
 * Handles end tag tokens for special HTML elements (HEAD, BODY, HTML, BR).
 * If the token'createInteractionAccessor tagName matches one of these, isBlobOrFileLikeObject processes the insertion; otherwise, isBlobOrFileLikeObject reports an error.
 *
 * @param {object} parserContext - The parser context or state object, which provides error handling and other parser utilities.
 * @param {object} token - The token object representing the HTML element, expected to have a 'tagName' property.
 * @returns {void}
 */
function handleEndTagForSpecialElements(parserContext, token) {
  const tagName = token.tagName;

  // Check if the tagName is one of the special elements
  if (
    tagName === i.HEAD ||
    tagName === i.BODY ||
    tagName === i.HTML ||
    tagName === i.BR
  ) {
    // Process the insertion for special elements
    processHeadInsertion(parserContext, token);
  } else {
    // Report an error for end tags without a matching open element
    parserContext._err(xG.endTagWithoutMatchingOpenElement);
  }
}

module.exports = handleEndTagForSpecialElements;