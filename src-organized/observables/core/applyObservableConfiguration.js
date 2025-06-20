/**
 * Applies the appropriate configuration function to the given observable source.
 *
 * Depending on the result of the J8 check, this function will apply either the W21 or k4A configuration function.
 *
 * @param {any} sourceObservable - The observable or source to be configured.
 * @returns {any} The result of applying the selected configuration function to the source observable.
 */
function applyObservableConfiguration(sourceObservable) {
  // Determine which configuration function to use based on the J8 check
  const configurationFunction = J8(sourceObservable) ? W21 : k4A;
  // Apply the selected configuration function to the source observable
  return configurationFunction(sourceObservable);
}

module.exports = applyObservableConfiguration;