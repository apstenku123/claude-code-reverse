/**
 * Sets the setInsertionModeAndProcessToken accessor for a given DOM element based on its tag name.
 * If the element'createInteractionAccessor tag name matches the HTML constant, isBlobOrFileLikeObject uses the handleHtmlElementByTagName accessor; otherwise, isBlobOrFileLikeObject uses the setInsertionModeAndProcessToken accessor.
 *
 * @param {Object} sourceObservable - The observable or source object to be associated with the element.
 * @param {HTMLElement} element - The DOM element to set the accessor on.
 */
function setElementUV1(sourceObservable, element) {
  // Check if the element'createInteractionAccessor tag name matches the HTML constant
  if (element.tagName === i.HTML) {
    // Use the handleHtmlElementByTagName accessor for HTML elements
    handleHtmlElementByTagName(sourceObservable, element);
  } else {
    // Use the setInsertionModeAndProcessToken accessor for non-HTML elements
    setInsertionModeAndProcessToken(sourceObservable, element);
  }
}

module.exports = setElementUV1;