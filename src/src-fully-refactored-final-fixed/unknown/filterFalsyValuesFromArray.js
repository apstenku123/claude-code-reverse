/**
 * Filters out falsy values (false, 0, '', null, undefined, NaN) from the provided array-like object.
 *
 * @param {Array<any> | null | undefined} inputArray - The array or array-like object to filter.
 * @returns {Array<any>} a new array containing only the truthy values from the input.
 */
function filterFalsyValuesFromArray(inputArray) {
  // If input is null or undefined, treat as empty array
  const length = inputArray == null ? 0 : inputArray.length;
  const filteredArray = [];
  let filteredIndex = 0;

  // Iterate over each element in the input array
  for (let currentIndex = 0; currentIndex < length; currentIndex++) {
    const currentValue = inputArray[currentIndex];
    // Only add truthy values to the result array
    if (currentValue) {
      filteredArray[filteredIndex++] = currentValue;
    }
  }

  return filteredArray;
}

module.exports = filterFalsyValuesFromArray;