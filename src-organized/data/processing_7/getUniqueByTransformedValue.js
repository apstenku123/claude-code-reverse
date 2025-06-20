/**
 * Returns a new array containing the first occurrence of each unique element from the input array,
 * where uniqueness is determined by a transformation function. If no transformation function is provided,
 * elements are compared directly. Zero values are preserved as zero.
 *
 * @param {Array} inputArray - The array to process for unique elements.
 * @param {Function} [transformFn] - Optional function to transform each element for uniqueness comparison.
 * @returns {Array} a new array with unique elements based on the transformed value.
 */
function getUniqueByTransformedValue(inputArray, transformFn) {
  let currentIndex = 0;
  const arrayLength = inputArray.length;
  let uniqueIndex = 0;
  const uniqueElements = [];
  let lastTransformedValue;

  while (currentIndex < arrayLength) {
    const currentElement = inputArray[currentIndex];
    // Apply the transformation function if provided, otherwise use the element itself
    const transformedValue = transformFn ? transformFn(currentElement) : currentElement;

    // For the first element, or if the transformed value is not equal to the last one, add to result
    if (currentIndex === 0 || !H9(transformedValue, lastTransformedValue)) {
      lastTransformedValue = transformedValue;
      // Preserve zero values as zero, otherwise use the element as is
      uniqueElements[uniqueIndex++] = currentElement === 0 ? 0 : currentElement;
    }
    currentIndex++;
  }

  return uniqueElements;
}

module.exports = getUniqueByTransformedValue;