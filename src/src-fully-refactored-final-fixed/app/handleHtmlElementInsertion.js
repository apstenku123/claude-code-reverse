/**
 * Handles the insertion of an HTML element into the DOM tree during parsing, based on the element'createInteractionAccessor tag name.
 * This function determines the appropriate insertion mode and error handling for specific HTML elements
 * according to the HTML parsing algorithm.
 *
 * @param {object} parserContext - The parser context object, containing state and helper methods for parsing.
 * @param {object} elementToken - The token representing the HTML element to insert. Must have a 'tagName' property.
 * @returns {void}
 */
function handleHtmlElementInsertion(parserContext, elementToken) {
  const tagName = elementToken.tagName;

  // Handle <html> tag
  if (tagName === i.HTML) {
    handleHtmlElementByTagName(parserContext, elementToken);
    return;
  }

  // Handle <body> tag
  if (tagName === i.BODY) {
    parserContext._insertElement(elementToken, u2.HTML);
    parserContext.framesetOk = false;
    parserContext.insertionMode = "IN_BODY_MODE";
    return;
  }

  // Handle <frameset> tag
  if (tagName === i.FRAMESET) {
    parserContext._insertElement(elementToken, u2.HTML);
    parserContext.insertionMode = "IN_FRAMESET_MODE";
    return;
  }

  // Handle tags that are only allowed in <head> but appear elsewhere
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
    // Temporarily push the head element to open elements stack
    parserContext.openElements.push(parserContext.headElement);
    // Process the token as if isBlobOrFileLikeObject were in the head
    handleHeadElementStartTag(parserContext, elementToken);
    // Remove the head element from the open elements stack
    parserContext.openElements.remove(parserContext.headElement);
    return;
  }

  // Handle misplaced <head> tag
  if (tagName === i.HEAD) {
    parserContext._err(xG.misplacedStartTagForHeadElement);
    return;
  }

  // For all other tags, use the generic handler
  insertFakeElementAndProcessToken(parserContext, elementToken);
}

module.exports = handleHtmlElementInsertion;