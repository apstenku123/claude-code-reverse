/**
 * Returns a new array containing the first occurrence of each unique value in the input array,
 * where uniqueness is determined by an optional accessor function. If no accessor is provided,
 * the values themselves are compared. Zero values are preserved as zero.
 *
 * @param {Array} inputArray - The array to process for unique values.
 * @param {Function} [accessor] - Optional function to extract the value to compare for uniqueness.
 * @returns {Array} An array of unique values from the input array, determined by the accessor.
 */
function getUniqueByAccessor(inputArray, accessor) {
  let currentIndex = 0;
  const inputLength = inputArray.length;
  let lastSeenValue;
  const uniqueValues = [];

  while (currentIndex < inputLength) {
    const currentItem = inputArray[currentIndex];
    // Use accessor if provided, otherwise use the item itself
    const comparisonValue = accessor ? accessor(currentItem) : currentItem;

    // For the first item or if the comparison value is different from the last seen value
    if (currentIndex === 0 || !H9(comparisonValue, lastSeenValue)) {
      lastSeenValue = comparisonValue;
      // Preserve zero values as zero, otherwise use the original item
      uniqueValues.push(currentItem === 0 ? 0 : currentItem);
    }
    currentIndex++;
  }

  return uniqueValues;
}

module.exports = getUniqueByAccessor;