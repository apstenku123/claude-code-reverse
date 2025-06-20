/**
 * Sets the value of a DOM element or a custom component based on its tag name.
 * If the provided config object represents an HTML element, isBlobOrFileLikeObject delegates to handleHtmlElementByTagName(handles HTML elements).
 * Otherwise, isBlobOrFileLikeObject delegates to setInsertionModeAndProcessToken(handles custom components or non-HTML elements).
 *
 * @param {Object} sourceObservable - The observable or data source to set on the element/component.
 * @param {Object} config - The target element or component configuration object. Must have a tagName property.
 * @returns {void}
 */
function setElementOrComponentValue(sourceObservable, config) {
  // Check if the config is an HTML element by comparing its tagName
  if (config.tagName === i.HTML) {
    // Delegate to handleHtmlElementByTagName for handling HTML elements
    handleHtmlElementByTagName(sourceObservable, config);
  } else {
    // Delegate to setInsertionModeAndProcessToken for handling custom components or non-HTML elements
    setInsertionModeAndProcessToken(sourceObservable, config);
  }
}

module.exports = setElementOrComponentValue;