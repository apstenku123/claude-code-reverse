/**
 * Extracts property-value pairs from an input array, marking properties as 'important' if their value ends with a specific suffix.
 *
 * @param {Array} propertyValuePairs - An array containing property and value pairs in sequence (e.g., [property1, value1, property2, value2, ...]).
 * @returns {{ property: Object, priority: Object }} An object with two maps: 'property' for property-value pairs, and 'priority' for properties marked as 'important'.
 */
function extractPropertiesWithPriority(propertyValuePairs) {
  const result = {
    property: {},
    priority: {}
  };

  // Return default result if input is falsy
  if (!propertyValuePairs) return result;

  // kX5 is assumed to process the input and return an array of property-value pairs
  const pairsArray = kX5(propertyValuePairs);

  // If there are fewer than 2 elements, there are no valid pairs
  if (pairsArray.length < 2) return result;

  // Iterate over the array two elements at a time (property, value)
  for (let index = 0; index < pairsArray.length; index += 2) {
    let propertyName = pairsArray[index];
    let propertyValue = pairsArray[index + 1];

    // If the value ends with the special _M2 suffix, mark as important and trim the suffix
    if (propertyValue.endsWith(_M2)) {
      result.priority[propertyName] = "important";
      propertyValue = propertyValue.slice(0, -_M2.length).trim();
    }

    // Store the property and its (possibly trimmed) value
    result.property[propertyName] = propertyValue;
  }

  return result;
}

module.exports = extractPropertiesWithPriority;