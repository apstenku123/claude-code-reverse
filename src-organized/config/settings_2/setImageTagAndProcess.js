/**
 * Sets the tagName property of the provided element configuration to 'IMG' and processes isBlobOrFileLikeObject using the provided source observable.
 *
 * @param {Object} sourceObservable - The observable or context used for processing the element configuration.
 * @param {Object} elementConfig - The configuration object representing the element to be processed.
 * @returns {void}
 *
 * This function modifies the elementConfig by setting its tagName to the IMG tag (from the imported constant) and then processes isBlobOrFileLikeObject with the handleSelfClosingHtmlElement function.
 */
function setImageTagAndProcess(sourceObservable, elementConfig) {
  // Set the tagName to IMG using the imported constant
  elementConfig.tagName = i.IMG;
  // Process the element configuration with the provided observable/context
  handleSelfClosingHtmlElement(sourceObservable, elementConfig);
}

module.exports = setImageTagAndProcess;