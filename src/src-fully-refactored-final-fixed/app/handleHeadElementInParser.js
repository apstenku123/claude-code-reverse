/**
 * Handles parsing logic for elements encountered within the <head> section of an HTML document.
 * Determines the correct action based on the tag name of the element.
 *
 * @param {Object} parserContext - The current parser context or state object.
 * @param {HTMLElement} element - The DOM element being processed.
 * @returns {void}
 */
function handleHeadElementInParser(parserContext, element) {
  const tagName = element.tagName;

  // If the element is <html>, delegate to handleHtmlElementInHead
  if (tagName === i.HTML) {
    handleHtmlElementByTagName(parserContext, element);
  }
  // If the element is one of the metadata or head-only tags, delegate to handleHeadMetadataElement
  else if (
    tagName === i.BASEFONT ||
    tagName === i.BGSOUND ||
    tagName === i.HEAD ||
    tagName === i.LINK ||
    tagName === i.META ||
    tagName === i.NOFRAMES ||
    tagName === i.STYLE
  ) {
    handleHeadElementStartTag(parserContext, element);
  }
  // If the element is <noscript>, report a nested <noscript> error
  else if (tagName === i.NOSCRIPT) {
    parserContext._err(xG.nestedNoscriptInHead);
  }
  // For all other elements, handle as generic content in <head>
  else {
    handleNoscriptInHeadMode(parserContext, element);
  }
}

module.exports = handleHeadElementInParser;