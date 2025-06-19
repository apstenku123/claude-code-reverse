/**
 * Extracts nested property values from each object in the global 'kj9' array using a sequence of property names.
 *
 * @param {...string} propertyPath - One or more property names representing the path to extract from each object in 'kj9'.
 * @returns {Array<any>} An array containing the extracted values from each object in 'kj9'. If a property in the path is missing, returns undefined for that object.
 * @throws {Error} If no property names are provided.
 */
function pluckPropertiesFromKj9(...propertyPath) {
  // Validate that at least one property name is provided
  if (propertyPath.length === 0) {
    throw new Error("list of properties cannot be empty.");
  }

  // Map over each object in the global 'kj9' array
  return kj9.map((item) => {
    let currentValue = item;
    // Traverse the property path step by step
    for (let i = 0; i < propertyPath.length; i++) {
      // Use optional chaining to safely access nested properties
      const nextValue = currentValue?.[propertyPath[i]];
      if (typeof nextValue !== "undefined") {
        currentValue = nextValue;
      } else {
        // If any property in the path is missing, return undefined
        return;
      }
    }
    return currentValue;
  });
}

module.exports = pluckPropertiesFromKj9;