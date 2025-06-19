/**
 * Applies a function to a mapped value from a lookup array.
 *
 * @param {*} inputValue - The value to be processed by the function.
 * @param {number} lookupIndex - The index used to retrieve a value from the lookup array.
 * @returns {*} The result of applying the function to the mapped value.
 */
function applyFunctionToMappedValue(inputValue, lookupIndex) {
  // Retrieve the value from the lookup array using the provided index
  const mappedValue = lookupArray[lookupIndex];
  // Apply the function 'processFunction' to the input value and the mapped value
  return processFunction(inputValue, mappedValue);
}

module.exports = applyFunctionToMappedValue;