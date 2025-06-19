/**
 * Handles the insertion and parsing logic for start tags encountered in the <head> section of an HTML document during parsing.
 * Determines the appropriate action based on the tag name, such as switching parsing modes, inserting elements, or handling errors.
 *
 * @param {Object} parserContext - The current parser context, containing state and methods for manipulating the DOM and parser state.
 * @param {Object} token - The token representing the start tag element to process. Must have a 'tagName' property.
 * @returns {void}
 */
function handleHeadElementStartTag(parserContext, token) {
  const tagName = token.tagName;

  // Handle <html> tag
  if (tagName === i.HTML) {
    handleHtmlElementByTagName(parserContext, token);
    return;
  }

  // Handle void elements in <head>
  if (
    tagName === i.BASE ||
    tagName === i.BASEFONT ||
    tagName === i.BGSOUND ||
    tagName === i.LINK ||
    tagName === i.META
  ) {
    parserContext._appendElement(token, u2.HTML);
    token.ackSelfClosing = true;
    return;
  }

  // Handle <title> tag (RCDATA mode)
  if (tagName === i.TITLE) {
    parserContext._switchToTextParsing(token, e1.MODE.RCDATA);
    return;
  }

  // Handle <noscript> tag
  if (tagName === i.NOSCRIPT) {
    if (parserContext.options.scriptingEnabled) {
      // If scripting is enabled, parse as RAWTEXT
      parserContext._switchToTextParsing(token, e1.MODE.RAWTEXT);
    } else {
      // Otherwise, insert element and switch insertion mode
      parserContext._insertElement(token, u2.HTML);
      parserContext.insertionMode = "IN_HEAD_NO_SCRIPT_MODE";
    }
    return;
  }

  // Handle <noframes> and <style> tags (RAWTEXT mode)
  if (tagName === i.NOFRAMES || tagName === i.STYLE) {
    parserContext._switchToTextParsing(token, e1.MODE.RAWTEXT);
    return;
  }

  // Handle <script> tag (SCRIPT_DATA mode)
  if (tagName === i.SCRIPT) {
    parserContext._switchToTextParsing(token, e1.MODE.SCRIPT_DATA);
    return;
  }

  // Handle <template> tag
  if (tagName === i.TEMPLATE) {
    parserContext._insertTemplate(token, u2.HTML);
    parserContext.activeFormattingElements.insertMarker();
    parserContext.framesetOk = false;
    parserContext.insertionMode = "IN_TEMPLATE_MODE";
    parserContext._pushTmplInsertionMode("IN_TEMPLATE_MODE");
    return;
  }

  // Handle misplaced <head> tag
  if (tagName === i.HEAD) {
    parserContext._err(xG.misplacedStartTagForHeadElement);
    return;
  }

  // For all other tags, delegate to after-head mode handler
  handleAfterHeadModeTransition(parserContext, token);
}

module.exports = handleHeadElementStartTag;