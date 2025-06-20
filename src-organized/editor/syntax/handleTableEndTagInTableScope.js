/**
 * Handles the processing of an end tag token for a <table> element when isBlobOrFileLikeObject is in the table scope.
 * If a <table> element is found in the open elements stack within the table scope, this function
 * pops elements until the <table> tag is removed, resets the insertion mode, and processes the token.
 *
 * @param {object} parserContext - The parser context containing open elements and parsing methods.
 * @param {object} token - The token to be processed after handling the <table> end tag.
 * @returns {void}
 */
function handleTableEndTagInTableScope(parserContext, token) {
  // Check if there is a <table> element in the open elements stack within table scope
  if (parserContext.openElements.hasInTableScope(parserContext.TAG_NAMES.TABLE)) {
    // Pop elements until the <table> tag is removed from the stack
    parserContext.openElements.popUntilTagNamePopped(parserContext.TAG_NAMES.TABLE);
    // Reset the insertion mode according to the new context
    parserContext._resetInsertionMode();
    // Process the current token again in the new context
    parserContext._processToken(token);
  }
}

module.exports = handleTableEndTagInTableScope;