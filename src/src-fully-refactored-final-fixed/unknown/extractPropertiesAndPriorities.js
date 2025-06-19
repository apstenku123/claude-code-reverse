/**
 * Extracts property-value pairs from an input array, marking properties as 'important' if their value ends with a specific suffix.
 *
 * @param {Array} propertyPairs - An array containing property names and values in alternating order.
 * @returns {Object} An object with 'property' and 'priority' maps.
 */
function extractPropertiesAndPriorities(propertyPairs) {
  // The suffix that denotes an 'important' property
  const IMPORTANT_SUFFIX = _M2;

  // Initialize the result object with empty maps
  const result = {
    property: {},
    priority: {}
  };

  // Return early if input is falsy
  if (!propertyPairs) return result;

  // Use kX5 to process the input into a flat array of property-value pairs
  const pairsArray = kX5(propertyPairs);

  // If there are fewer than 2 elements, there are no valid pairs
  if (pairsArray.length < 2) return result;

  // Iterate over the array two elements at a time (property, value)
  for (let index = 0; index < pairsArray.length; index += 2) {
    let propertyName = pairsArray[index];
    let propertyValue = pairsArray[index + 1];

    // If the value ends with the important suffix, mark as important and trim the suffix
    if (propertyValue.endsWith(IMPORTANT_SUFFIX)) {
      result.priority[propertyName] = "important";
      propertyValue = propertyValue.slice(0, -IMPORTANT_SUFFIX.length).trim();
    }

    // Store the property and its (possibly trimmed) value
    result.property[propertyName] = propertyValue;
  }

  return result;
}

module.exports = extractPropertiesAndPriorities;