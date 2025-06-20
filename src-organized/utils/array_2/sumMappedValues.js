/**
 * Sums the results of applying a mapping function to each element of an array, skipping undefined sentinel values.
 *
 * @param {Array} inputArray - The array of elements to process.
 * @param {Function} mapFunction - The function to apply to each element. Should return a value to sum, or a sentinel value to skip.
 * @returns {any} The sum of mapped values, or undefined if no valid values were found.
 */
function sumMappedValues(inputArray, mapFunction) {
  let sum;
  const SENTINEL = processInteractionEntries; // 'a' in original code, imported dependency
  const arrayLength = inputArray.length;

  for (let index = 0; index < arrayLength; index++) {
    const mappedValue = mapFunction(inputArray[index]);
    // Only sum values that are not the sentinel value
    if (mappedValue !== SENTINEL) {
      sum = sum === SENTINEL ? mappedValue : sum + mappedValue;
    }
  }

  return sum;
}

module.exports = sumMappedValues;