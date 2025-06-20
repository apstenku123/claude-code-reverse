/**
 * Filters out falsy values from an array-like object.
 *
 * @param {Array<any>} inputArray - The array or array-like object to filter.
 * @returns {Array<any>} a new array containing only the truthy values from the input.
 */
function filterTruthyValues(inputArray) {
  // If input is null or undefined, treat as empty array
  const arrayLength = inputArray == null ? 0 : inputArray.length;
  const truthyValues = [];

  // Iterate through each element and add truthy values to the result array
  for (let index = 0; index < arrayLength; index++) {
    const currentValue = inputArray[index];
    if (currentValue) {
      truthyValues.push(currentValue);
    }
  }

  return truthyValues;
}

module.exports = filterTruthyValues;