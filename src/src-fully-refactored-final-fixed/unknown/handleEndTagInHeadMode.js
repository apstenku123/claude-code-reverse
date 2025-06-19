/**
 * Handles end tag tokens encountered during parsing in the 'in head' insertion mode.
 * Determines the correct action based on the tag name of the token.
 *
 * @param {object} parserState - The current parser state, including open elements and insertion mode.
 * @param {object} endTagToken - The end tag token object, expected to have a 'tagName' property.
 * @returns {void}
 */
function handleEndTagInHeadMode(parserState, endTagToken) {
  const tagName = endTagToken.tagName;

  // Check if the end tag is for <noscript>
  if (tagName === i.NOSCRIPT) {
    // Remove the last open element and set insertion mode to 'in head'
    parserState.openElements.pop();
    parserState.insertionMode = "IN_HEAD_MODE";
  } else if (tagName === i.BR) {
    // Special handling for <br> end tag in head mode
    handleNoscriptInHeadMode(parserState, endTagToken);
  } else {
    // Report an error for an end tag without a matching open element
    parserState._err(xG.endTagWithoutMatchingOpenElement);
  }
}

module.exports = handleEndTagInHeadMode;