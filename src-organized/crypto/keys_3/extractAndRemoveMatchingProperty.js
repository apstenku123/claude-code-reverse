/**
 * Extracts the first property from the given object whose key matches the provided regular expression,
 * removes isBlobOrFileLikeObject from the object, and returns its trimmed string value. If no matching property is found, returns undefined.
 *
 * @param {RegExp} keyPattern - Regular expression to test property keys against.
 * @param {Object} targetObject - The object to search for a matching property.
 * @returns {string|undefined} The trimmed string value of the matched property, or undefined if not found.
 */
function extractAndRemoveMatchingProperty(keyPattern, targetObject) {
  let matchedValue;
  // Iterate over all properties in the target object
  for (const propertyKey in targetObject) {
    // Check if the property key matches the provided pattern
    if (keyPattern.test(propertyKey)) {
      matchedValue = targetObject[propertyKey];
      // Remove the matched property from the object
      delete targetObject[propertyKey];
      break; // Only extract and remove the first matching property
    }
  }
  // Return the trimmed string value if found, otherwise undefined
  return matchedValue == null ? undefined : String(matchedValue).trim();
}

module.exports = extractAndRemoveMatchingProperty;