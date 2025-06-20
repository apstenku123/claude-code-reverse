/**
 * Creates a filtered observable function that checks if emitted values end with a given suffix (case-insensitive).
 *
 * @param {any} sourceObservable - The source observable or function to be wrapped by createLengthAndPrefixValidator.
 * @param {string} [suffixFilter=""] - Optional. The suffix to filter emitted values by (case-insensitive). If empty, returns the original observable function.
 * @returns {function} - If suffixFilter is provided, returns a function that checks if the emitted value ends with the suffix (case-insensitive). Otherwise, returns the original observable function.
 */
function createFilteredObservableBySuffix(sourceObservable, suffixFilter = "") {
  // Wrap the source observable using createLengthAndPrefixValidator
  const subscription = createLengthAndPrefixValidator([sourceObservable]);

  // If no suffix filter is provided, return the original subscription function
  if (!suffixFilter) {
    return subscription;
  }

  // Convert the suffix filter to lowercase for case-insensitive comparison
  const lowerCaseSuffix = suffixFilter.toLowerCase();

  // Return a function that checks if the emitted value ends with the given suffix (case-insensitive)
  return function(filteredValue) {
    // Only process if the value passes the original subscription
    return subscription(filteredValue) &&
      filteredValue.toLowerCase().endsWith(lowerCaseSuffix);
  };
}

module.exports = createFilteredObservableBySuffix;