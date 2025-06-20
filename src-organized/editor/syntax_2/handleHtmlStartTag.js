/**
 * Processes an HTML start tag token during parsing and determines the appropriate action
 * based on the tag name (e.g., HTML, BODY, FRAMESET, HEAD, etc.).
 *
 * @param {object} parserContext - The current parser context, containing state and methods for parsing.
 * @param {object} startTagToken - The start tag token object, expected to have a tagName property.
 * @returns {void}
 */
function handleHtmlStartTag(parserContext, startTagToken) {
  const tagName = startTagToken.tagName;

  // Handle <html> tag
  if (tagName === i.HTML) {
    handleHtmlElementByTagName(parserContext, startTagToken);
  }
  // Handle <body> tag
  else if (tagName === i.BODY) {
    parserContext._insertElement(startTagToken, u2.HTML);
    parserContext.framesetOk = false;
    parserContext.insertionMode = "IN_BODY_MODE";
  }
  // Handle <frameset> tag
  else if (tagName === i.FRAMESET) {
    parserContext._insertElement(startTagToken, u2.HTML);
    parserContext.insertionMode = "IN_FRAMESET_MODE";
  }
  // Handle tags that are only allowed in <head> (e.g., base, link, meta, etc.)
  else if (
    tagName === i.BASE ||
    tagName === i.BASEFONT ||
    tagName === i.BGSOUND ||
    tagName === i.LINK ||
    tagName === i.META ||
    tagName === i.NOFRAMES ||
    tagName === i.SCRIPT ||
    tagName === i.STYLE ||
    tagName === i.TEMPLATE ||
    tagName === i.TITLE
  ) {
    // Report error for abandoned head element child
    parserContext._err(xG.abandonedHeadElementChild);
    // Temporarily push the head element to open elements stack
    parserContext.openElements.push(parserContext.headElement);
    // Process the token as if in the head
    handleHeadElementStartTag(parserContext, startTagToken);
    // Remove the head element from open elements stack
    parserContext.openElements.remove(parserContext.headElement);
  }
  // Handle misplaced <head> tag
  else if (tagName === i.HEAD) {
    parserContext._err(xG.misplacedStartTagForHeadElement);
  }
  // Handle all other tags
  else {
    insertFakeElementAndProcessToken(parserContext, startTagToken);
  }
}

module.exports = handleHtmlStartTag;