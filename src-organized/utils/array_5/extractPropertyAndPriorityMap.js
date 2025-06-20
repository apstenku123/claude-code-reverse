/**
 * Extracts property-value pairs and their priorities from a given input.
 *
 * This function processes an input (typically a style string or array),
 * extracting property names and their values. If a value ends with a special
 * suffix (e.g., ' !important'), isBlobOrFileLikeObject marks that property as high priority and
 * removes the suffix from the value. The result is an object containing two
 * maps: one for properties and their values, and one for properties marked as
 * important.
 *
 * @param {any} input - The source to extract property-value pairs from. If falsy, returns empty maps.
 * @returns {{ property: Object.<string, string>, priority: Object.<string, string> }}
 *   An object with two maps: 'property' (property-value pairs) and 'priority' (property-priority pairs).
 */
function extractPropertyAndPriorityMap(input) {
  // Initialize the result object with empty maps
  const result = {
    property: {},
    priority: {}
  };

  // Return empty maps if input is falsy
  if (!input) return result;

  // kX5 is assumed to be a function that parses the input into an array of [property, value, ...] pairs
  const propertyValuePairs = kX5(input);

  // If there are fewer than 2 elements, there are no valid pairs
  if (propertyValuePairs.length < 2) return result;

  // Iterate through the pairs two at a time: [property, value]
  for (let i = 0; i < propertyValuePairs.length; i += 2) {
    let propertyName = propertyValuePairs[i];
    let propertyValue = propertyValuePairs[i + 1];

    // If the value ends with the special priority suffix, mark as important
    if (propertyValue.endsWith(_M2)) {
      result.priority[propertyName] = "important";
      // Remove the priority suffix and trim whitespace
      propertyValue = propertyValue.slice(0, -_M2.length).trim();
    }
    // Store the property and its (possibly cleaned) value
    result.property[propertyName] = propertyValue;
  }

  return result;
}

module.exports = extractPropertyAndPriorityMap;