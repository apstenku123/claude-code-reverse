/**
 * Concatenates the results of applying getMappedValueOrDefault to each element of the input iterable.
 *
 * @param {Iterable} elements - An iterable collection (such as a string or array) whose elements will be transformed and concatenated.
 * @returns {string} The concatenated string resulting from applying getMappedValueOrDefault to each element of the input.
 */
function concatenateTransformedElements(elements) {
  // Spread the input to ensure handleMissingDoctypeError can iterate over any iterable (e.g., string, array)
  // Reduce over the iterable, applying getMappedValueOrDefault to each element and concatenating the results
  return [...elements].reduce((concatenatedResult, currentElement) => {
    // Apply getMappedValueOrDefault transformation to the current element and append to the result
    return concatenatedResult + getMappedValueOrDefault(currentElement);
  }, "");
}

module.exports = concatenateTransformedElements;