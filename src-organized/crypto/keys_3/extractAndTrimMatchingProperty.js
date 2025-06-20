/**
 * Extracts the value of the first property in the object whose key matches the provided regular expression,
 * removes that property from the object, and returns the trimmed string value of the property.
 * If no matching property is found, returns undefined.
 *
 * @param {RegExp} keyPattern - Regular expression to test property keys against.
 * @param {Object} objectWithProperties - The object to search and mutate.
 * @returns {string|undefined} The trimmed string value of the matched property, or undefined if not found.
 */
function extractAndTrimMatchingProperty(keyPattern, objectWithProperties) {
  let matchedValue;
  // Iterate over all properties in the object
  for (const propertyKey in objectWithProperties) {
    // If the property key matches the provided regular expression
    if (keyPattern.test(propertyKey)) {
      matchedValue = objectWithProperties[propertyKey];
      // Remove the matched property from the object
      delete objectWithProperties[propertyKey];
      break; // Only process the first matching property
    }
  }
  // Return the trimmed string value if found, otherwise undefined
  return matchedValue == null ? undefined : String(matchedValue).trim();
}

module.exports = extractAndTrimMatchingProperty;