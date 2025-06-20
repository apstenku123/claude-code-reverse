/**
 * Handles an HTML token encountered within the <head> section during parsing.
 * Determines the tag type and delegates processing to the appropriate handler.
 *
 * @param {object} parserContext - The current parser context, including error reporting and state.
 * @param {HTMLElement} tokenElement - The HTML element token being processed.
 * @returns {void}
 */
function handleHeadTagToken(parserContext, tokenElement) {
  const tagName = tokenElement.tagName;

  // If the tag is <html>, process as an HTML element in head
  if (tagName === i.HTML) {
    handleHtmlElementByTagName(parserContext, tokenElement);
  }
  // If the tag is one of the self-closing or metadata tags, process accordingly
  else if (
    tagName === i.BASEFONT ||
    tagName === i.BGSOUND ||
    tagName === i.HEAD ||
    tagName === i.LINK ||
    tagName === i.META ||
    tagName === i.NOFRAMES ||
    tagName === i.STYLE
  ) {
    handleHeadElementStartTag(parserContext, tokenElement);
  }
  // If the tag is <noscript>, report a nested <noscript> error
  else if (tagName === i.NOSCRIPT) {
    parserContext._err(xG.nestedNoscriptInHead);
  }
  // For all other tags, handle as a generic token in head
  else {
    handleNoscriptInHeadMode(parserContext, tokenElement);
  }
}

module.exports = handleHeadTagToken;