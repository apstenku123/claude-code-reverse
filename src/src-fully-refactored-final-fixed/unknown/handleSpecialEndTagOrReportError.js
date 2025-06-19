/**
 * Handles end tags for special HTML elements (<head>, <body>, <html>, <br>).
 * If the token'createInteractionAccessor tagName matches one of these, delegates processing to processHeadInsertion.
 * Otherwise, reports an error for an end tag without a matching open element.
 *
 * @param {object} parserContext - The current parser context, providing error reporting via _err().
 * @param {object} token - The token object representing the HTML tag, must have a tagName property.
 * @returns {void}
 */
function handleSpecialEndTagOrReportError(parserContext, token) {
  const tagName = token.tagName;
  // Check if the tag is one of the special HTML elements
  if (
    tagName === i.HEAD ||
    tagName === i.BODY ||
    tagName === i.HTML ||
    tagName === i.BR
  ) {
    // Delegate to processHeadInsertion for these special tags
    processHeadInsertion(parserContext, token);
  } else {
    // Report an error for unmatched end tags
    parserContext._err(xG.endTagWithoutMatchingOpenElement);
  }
}

module.exports = handleSpecialEndTagOrReportError;