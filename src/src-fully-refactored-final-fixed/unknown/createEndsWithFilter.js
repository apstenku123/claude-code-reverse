/**
 * Creates a filter function based on an observable and an optional suffix.
 *
 * If no suffix is provided, returns the result of applying createLengthAndNameFilter to the observable.
 * If a suffix is provided, returns a function that checks if the input passes the createLengthAndNameFilter filter and ends with the given suffix.
 *
 * @param {any} sourceObservable - The observable or value to be filtered by createLengthAndNameFilter.
 * @param {string} [suffix=""] - Optional string suffix to check with endsWith.
 * @returns {function|any} If suffix is empty, returns the result of createLengthAndNameFilter([sourceObservable]). Otherwise, returns a filter function.
 */
const createEndsWithFilter = (sourceObservable, suffix = "") => {
  // Apply the createLengthAndNameFilter function to the observable and store the filter function
  const ahaFilter = createLengthAndNameFilter([sourceObservable]);

  // If no suffix is provided, return the filter directly
  if (!suffix) {
    return ahaFilter;
  }

  // If a suffix is provided, return a function that checks both conditions
  return (input) => ahaFilter(input) && input.endsWith(suffix);
};

module.exports = createEndsWithFilter;
