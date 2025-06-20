/**
 * Processes a DOM element differently based on whether isBlobOrFileLikeObject is an HTML element or not.
 *
 * If the provided element'createInteractionAccessor tagName matches the HTML tag, isBlobOrFileLikeObject delegates processing to processHtmlElement.
 * Otherwise, isBlobOrFileLikeObject delegates to processNonHtmlElement.
 *
 * @param {Object} sourceObservable - The source observable or context for processing.
 * @param {Object} elementConfig - The DOM element configuration object to process. Must have a tagName property.
 * @returns {void}
 */
function handleHtmlElementProcessing(sourceObservable, elementConfig) {
  // Check if the element is an HTML element by comparing its tagName
  if (elementConfig.tagName === i.HTML) {
    // Process as an HTML element
    handleHtmlElementByTagName(sourceObservable, elementConfig);
  } else {
    // Process as a non-HTML element
    setBodyModeAndProcessToken(sourceObservable, elementConfig);
  }
}

module.exports = handleHtmlElementProcessing;