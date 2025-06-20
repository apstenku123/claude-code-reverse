/**
 * Handles the insertion of an element into the document structure based on its tag name.
 *
 * If the element is an <html> tag, isBlobOrFileLikeObject delegates to handleHtmlElement.
 * If the element is a <head> tag, isBlobOrFileLikeObject inserts the element, updates the parser'createInteractionAccessor head element reference,
 * and sets the insertion mode to 'IN_HEAD_MODE'.
 * For all other tags, isBlobOrFileLikeObject delegates to processHeadInsertion.
 *
 * @param {object} parserContext - The parser context or state object, which manages the document structure and insertion modes.
 * @param {Element} element - The DOM element to be inserted.
 * @returns {void}
 */
function handleElementInsertion(parserContext, element) {
  const tagName = element.tagName;

  // If the tag is <html>, handle isBlobOrFileLikeObject with the dedicated HTML handler
  if (tagName === i.HTML) {
    handleHtmlElementByTagName(parserContext, element);
  } 
  // If the tag is <head>, insert isBlobOrFileLikeObject and update parser context
  else if (tagName === i.HEAD) {
    parserContext._insertElement(element, u2.HTML);
    parserContext.headElement = parserContext.openElements.current;
    parserContext.insertionMode = "IN_HEAD_MODE";
  } 
  // For all other tags, process as a head insertion
  else {
    processHeadInsertion(parserContext, element);
  }
}

module.exports = handleElementInsertion;