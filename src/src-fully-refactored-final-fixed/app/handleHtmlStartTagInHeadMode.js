/**
 * Handles the processing of start tags encountered in the 'in head' insertion mode of an HTML parser.
 * Determines the appropriate action based on the tag name of the element being processed.
 *
 * @param {object} parserContext - The parser context object, containing state and methods for HTML parsing.
 * @param {object} elementToken - The token representing the HTML element to process (must have a tagName property).
 * @returns {void}
 */
function handleHtmlStartTagInHeadMode(parserContext, elementToken) {
  const tagName = elementToken.tagName;

  // If the tag is <html>, delegate to special handler
  if (tagName === i.HTML) {
    handleHtmlElementByTagName(parserContext, elementToken);
    return;
  }

  // If the tag is <body>, insert and switch to 'in body' mode
  if (tagName === i.BODY) {
    parserContext._insertElement(elementToken, u2.HTML);
    parserContext.framesetOk = false;
    parserContext.insertionMode = "IN_BODY_MODE";
    return;
  }

  // If the tag is <frameset>, insert and switch to 'in frameset' mode
  if (tagName === i.FRAMESET) {
    parserContext._insertElement(elementToken, u2.HTML);
    parserContext.insertionMode = "IN_FRAMESET_MODE";
    return;
  }

  // If the tag is one of the head element children that should be abandoned
  if (
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
    // Push the head element onto the open elements stack
    parserContext.openElements.push(parserContext.headElement);
    // Process the token as if in the head context
    handleHeadElementStartTag(parserContext, elementToken);
    // Remove the head element from the open elements stack
    parserContext.openElements.remove(parserContext.headElement);
    return;
  }

  // If the tag is <head>, report misplaced start tag error
  if (tagName === i.HEAD) {
    parserContext._err(xG.misplacedStartTagForHeadElement);
    return;
  }

  // For all other tags, delegate to the generic handler
  insertFakeElementAndProcessToken(parserContext, elementToken);
}

module.exports = handleHtmlStartTagInHeadMode;