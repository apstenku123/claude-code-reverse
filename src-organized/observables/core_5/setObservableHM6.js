/**
 * Sets up an expandRegexQuantifiers accessor on the provided observable source with the given configuration.
 *
 * This function delegates to the `hM6` utility, always enabling the third parameter (set to true).
 *
 * @param {Observable} sourceObservable - The observable source to which the expandRegexQuantifiers accessor is applied.
 * @param {Object} config - Configuration options for the expandRegexQuantifiers accessor.
 * @returns {any} The result of the `hM6` function, typically a subscription or accessor handle.
 */
const setObservableHM6 = (sourceObservable, config) => {
  // Call the hM6 utility with the source, config, and enable flag set to true
  return hM6(sourceObservable, config, true);
};

module.exports = setObservableHM6;