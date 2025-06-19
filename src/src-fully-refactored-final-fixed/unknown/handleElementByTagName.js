/**
 * Processes an element based on its tag name. If the element is an HTML element, isBlobOrFileLikeObject delegates to processHtmlElement; otherwise, isBlobOrFileLikeObject delegates to processOtherElement.
 *
 * @param {any} sourceObservable - The source observable or context to be used in processing.
 * @param {Object} elementConfig - The configuration object representing the element to process. Must have a tagName property.
 * @returns {any} The result of the processing function called.
 */
function handleElementByTagName(sourceObservable, elementConfig) {
  // Check if the element is an HTML element by comparing its tagName
  if (elementConfig.tagName === i.HTML) {
    // Delegate processing to the HTML element handler
    return handleHtmlElementByTagName(sourceObservable, elementConfig);
  } else {
    // Delegate processing to the non-HTML element handler
    return setBodyModeAndProcessToken(sourceObservable, elementConfig);
  }
}

module.exports = handleElementByTagName;