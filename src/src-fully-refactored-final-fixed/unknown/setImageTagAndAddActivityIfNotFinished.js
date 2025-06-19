/**
 * Sets the tagName property of the provided config object to 'IMG' and
 * adds an activity to the internal stack if the process has not been marked as finished.
 *
 * @param {Object} sourceObservable - The observable or source object to be processed.
 * @param {Object} config - The configuration object to be modified and passed to the activity handler.
 * @returns {any} The return value from the handleSelfClosingHtmlElement function, which handles adding the activity.
 */
function setImageTagAndAddActivityIfNotFinished(sourceObservable, config) {
  // Set the tagName property to 'IMG' using the external constant i.IMG
  config.tagName = i.IMG;
  // Pass the source and config to the handleSelfClosingHtmlElement function, which adds the activity if not finished
  return handleSelfClosingHtmlElement(sourceObservable, config);
}

module.exports = setImageTagAndAddActivityIfNotFinished;