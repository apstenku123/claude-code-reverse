/**
 * Applies the appropriate accessor logic to a DOM element based on its tag name.
 *
 * If the element is an HTML element, isBlobOrFileLikeObject uses the HTML-specific accessor (handleHtmlElementByTagName),
 * otherwise isBlobOrFileLikeObject uses the generic accessor (setInsertionModeAndProcessToken).
 *
 * @param {Observable} sourceObservable - The observable or data source to bind to the element.
 * @param {Element} targetElement - The DOM element to which the accessor will be applied.
 */
function applyAccessorToElement(sourceObservable, targetElement) {
  // Check if the target element is an HTML element
  if (targetElement.tagName === i.HTML) {
    // Use the HTML-specific accessor
    handleHtmlElementByTagName(sourceObservable, targetElement);
  } else {
    // Use the generic accessor for non-HTML elements
    setInsertionModeAndProcessToken(sourceObservable, targetElement);
  }
}

module.exports = applyAccessorToElement;