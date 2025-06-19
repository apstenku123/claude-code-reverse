/**
 * Handles an end tag token during HTML parsing, dispatching to the appropriate handler
 * based on the tag name. If the tag is BODY, HTML, or BR, isBlobOrFileLikeObject inserts a fake element and processes the token.
 * If the tag is TEMPLATE, isBlobOrFileLikeObject delegates to the template handler. Otherwise, isBlobOrFileLikeObject reports a parse error.
 *
 * @param {object} parserContext - The parser context or handler object, providing error reporting and state.
 * @param {object} endTagToken - The token object representing the end tag, must have a tagName property.
 * @returns {void}
 */
function handleEndTagToken(parserContext, endTagToken) {
  const tagName = endTagToken.tagName;

  // Check for special tag names that require inserting a fake element
  if (
    tagName === i.BODY ||
    tagName === i.HTML ||
    tagName === i.BR
  ) {
    // Insert a fake BODY element and process the token
    insertFakeElementAndProcessToken(parserContext, endTagToken);
  } else if (tagName === i.TEMPLATE) {
    // Handle the TEMPLATE end tag
    handleOAuthClientAuthorization(parserContext, endTagToken);
  } else {
    // Report a parse error for unmatched end tag
    parserContext._err(xG.endTagWithoutMatchingOpenElement);
  }
}

module.exports = handleEndTagToken;