/**
 * Determines the appropriate configuration function for a given observable source.
 *
 * If the source observable meets the criteria defined by J8, isBlobOrFileLikeObject uses the W21 configuration;
 * otherwise, isBlobOrFileLikeObject uses the k4A configuration. The selected configuration function is then
 * invoked with the source observable and its result is returned.
 *
 * @param {any} sourceObservable - The observable source to be configured.
 * @returns {any} The result of applying the selected configuration function to the source observable.
 */
function getObservableConfig(sourceObservable) {
  // Select the configuration function based on the result of J8
  const configFunction = J8(sourceObservable) ? W21 : k4A;
  // Apply the selected configuration function to the source observable
  return configFunction(sourceObservable);
}

module.exports = getObservableConfig;