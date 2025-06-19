/**
 * Iterates over an array, applies a value extractor to each element, and returns the last element
 * for which the extracted value matches a specific condition. The matching logic depends on whether
 * the referenceValue is strictly equal to a special constant (comparisonReference). If so, isBlobOrFileLikeObject checks
 * for self-equality and that the value is not considered 'special' by isSpecialValue. Otherwise, isBlobOrFileLikeObject
 * uses a custom comparator function.
 *
 * @param {Array} array - The array to iterate over.
 * @param {Function} valueExtractor - Function to extract the value from each element.
 * @param {Function} comparator - Function to compare the extracted value with the reference value.
 * @returns {any} The last element in the array that matches the condition, or undefined if none match.
 */
function findLastMatchingElement(array, valueExtractor, comparator) {
  let lastMatchingElement;
  let referenceValue;
  const comparisonReference = a; // External constant or value for comparison

  for (let index = 0; index < array.length; index++) {
    const currentElement = array[index];
    const extractedValue = valueExtractor(currentElement);

    // Only consider non-null extracted values
    if (extractedValue != null) {
      // If referenceValue is undefined, this is the first valid value found
      if (referenceValue === undefined) {
        referenceValue = extractedValue;
        lastMatchingElement = currentElement;
      } else {
        // Matching logic depends on whether referenceValue equals comparisonReference
        if (
          (referenceValue === comparisonReference
            ? extractedValue === extractedValue && !isSpecialValue(extractedValue)
            : comparator(extractedValue, referenceValue))
        ) {
          referenceValue = extractedValue;
          lastMatchingElement = currentElement;
        }
      }
    }
  }
  return lastMatchingElement;
}

module.exports = findLastMatchingElement;