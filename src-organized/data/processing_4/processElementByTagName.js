/**
 * Processes a DOM element based on its tag name.
 * If the element is an HTML element, isBlobOrFileLikeObject delegates to handleHtmlElement.
 * Otherwise, isBlobOrFileLikeObject delegates to handleOtherElement.
 *
 * @param {Object} sourceObservable - The observable or context to process with the element.
 * @param {HTMLElement} elementConfig - The DOM element to process, expected to have a tagName property.
 * @returns {any} The result of the delegated handler function.
 */
function processElementByTagName(sourceObservable, elementConfig) {
  // Check if the element is an HTML element by comparing its tagName
  if (elementConfig.tagName === i.HTML) {
    // Delegate processing to the HTML element handler
    return handleHtmlElementByTagName(sourceObservable, elementConfig);
  } else {
    // Delegate processing to the non-HTML element handler
    return setBodyModeAndProcessToken(sourceObservable, elementConfig);
  }
}

module.exports = processElementByTagName;