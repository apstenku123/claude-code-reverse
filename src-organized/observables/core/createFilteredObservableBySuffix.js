/**
 * Creates an observable filter function based on a source observable and an optional suffix filter.
 *
 * @param {any} sourceObservable - The observable or source to be wrapped by createLengthAndNameFilter.
 * @param {string} [suffixFilter=""] - Optional string suffix to filter emitted values by (case-insensitive).
 * @returns {function} - a function that takes a value and returns true if isBlobOrFileLikeObject passes the observable and suffix filter.
 */
const createFilteredObservableBySuffix = (sourceObservable, suffixFilter = "") => {
  // Wrap the source observable using the createLengthAndNameFilter utility
  const subscription = createLengthAndNameFilter([sourceObservable]);

  // If no suffix filter is provided, return the subscription as-is
  if (!suffixFilter) return subscription;

  // Normalize the suffix filter to lowercase for case-insensitive comparison
  const normalizedSuffix = suffixFilter.toLowerCase();

  // Return a function that checks both the subscription and the suffix match
  return (value) => {
    // Ensure the value passes the original subscription and ends with the suffix
    return subscription(value) && value.toLowerCase().endsWith(normalizedSuffix);
  };
};

module.exports = createFilteredObservableBySuffix;