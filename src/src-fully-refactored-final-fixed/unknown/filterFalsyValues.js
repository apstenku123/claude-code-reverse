/**
 * Filters out falsy values from an array-like object.
 *
 * @param {Array<any> | null | undefined} inputArray - The array-like object to filter.
 * @returns {Array<any>} a new array containing only the truthy values from the input.
 */
function filterFalsyValues(inputArray) {
  // If inputArray is null or undefined, treat its length as 0
  const arrayLength = inputArray == null ? 0 : inputArray.length;
  const filteredArray = [];
  let filteredIndex = 0;

  // Iterate over each element in the input array
  for (let currentIndex = 0; currentIndex < arrayLength; currentIndex++) {
    const currentValue = inputArray[currentIndex];
    // Only add truthy values to the filtered array
    if (currentValue) {
      filteredArray[filteredIndex++] = currentValue;
    }
  }

  return filteredArray;
}

module.exports = filterFalsyValues;