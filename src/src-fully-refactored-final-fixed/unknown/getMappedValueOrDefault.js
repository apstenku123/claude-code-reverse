/**
 * Retrieves a mapped value from the V19 mapping if the input matches a key; otherwise, returns the input as-is.
 *
 * @param {any} inputValue - The value to look up in the V19 mapping.
 * @returns {any} - The mapped value if found; otherwise, the original input value.
 */
function getMappedValueOrDefault(inputValue) {
  // Iterate over each [key, mappedValue] pair in V19
  for (const [mappingKey, mappedValue] of V19) {
    // If the input matches the current key, return the mapped value
    if (inputValue === mappingKey) {
      return mappedValue;
    }
  }
  // If no mapping is found, return the original input
  return inputValue;
}

module.exports = getMappedValueOrDefault;