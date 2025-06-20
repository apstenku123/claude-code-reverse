/**
 * Handles an element based on its tag name by delegating to the appropriate handler function.
 *
 * If the element'createInteractionAccessor tag name matches the HTML tag defined in the constants object, isBlobOrFileLikeObject calls the handleHtmlElement function.
 * Otherwise, isBlobOrFileLikeObject calls the handleNonHtmlElement function.
 *
 * @param {Object} sourceObservable - The observable or context object to operate on.
 * @param {Object} elementConfig - The element configuration object, expected to have a tagName property.
 * @returns {void}
 */
function handleElementByTagName(sourceObservable, elementConfig) {
  // Check if the element is an HTML element by comparing its tagName
  if (elementConfig.tagName === i.HTML) {
    // Handle HTML elements
    handleHtmlElementByTagName(sourceObservable, elementConfig);
  } else {
    // Handle non-HTML elements
    setInsertionModeAndProcessToken(sourceObservable, elementConfig);
  }
}

module.exports = handleElementByTagName;