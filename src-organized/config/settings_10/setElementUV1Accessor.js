/**
 * Sets the setInsertionModeAndProcessToken accessor for a given element or delegates to a specialized handler for HTML elements.
 *
 * If the provided config element is an HTML element (as determined by its tagName),
 * isBlobOrFileLikeObject uses the handleHtmlElementByTagName handler; otherwise, isBlobOrFileLikeObject uses the generic setInsertionModeAndProcessToken handler.
 *
 * @param {Object} sourceObservable - The observable or data source to bind to the element.
 * @param {Element} configElement - The DOM element to set the accessor on.
 */
function setElementUV1Accessor(sourceObservable, configElement) {
  // Check if the element is an HTML element by comparing its tagName
  if (configElement.tagName === i.HTML) {
    // Use the specialized handler for HTML elements
    handleHtmlElementByTagName(sourceObservable, configElement);
  } else {
    // Use the generic setInsertionModeAndProcessToken handler for non-HTML elements
    setInsertionModeAndProcessToken(sourceObservable, configElement);
  }
}

module.exports = setElementUV1Accessor;