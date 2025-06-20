/**
 * Appends an HTML element to the given source object and marks the element as self-closing.
 *
 * @param {Object} sourceObject - The object responsible for managing or rendering elements. Must implement the _appendElement method.
 * @param {Object} elementConfig - The configuration object for the element to append. Will be marked as self-closing.
 * @returns {void}
 */
function appendHtmlElementAndAcknowledgeSelfClosing(sourceObject, elementConfig) {
  // Append the HTML element using the provided source object'createInteractionAccessor method
  sourceObject._appendElement(elementConfig, u2.HTML);
  // Mark the element as self-closing
  elementConfig.ackSelfClosing = true;
}

module.exports = appendHtmlElementAndAcknowledgeSelfClosing;