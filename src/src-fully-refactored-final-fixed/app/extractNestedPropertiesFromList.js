/**
 * Extracts nested properties from each object in the global 'kj9' array, following the provided property path.
 *
 * @param {...string} propertyPath - The sequence of property names to traverse for each object in 'kj9'.
 * @returns {Array<any>} An array containing the value found at the nested property path for each object in 'kj9'.
 * @throws {Error} If no property path is provided.
 */
function extractNestedPropertiesFromList(...propertyPath) {
  // Validate that at least one property name is provided
  if (propertyPath.length === 0) {
    throw new Error("list of properties cannot be empty.");
  }

  // Map over each object in the global 'kj9' array
  return kj9.map((item) => {
    let currentValue = item;
    // Traverse the property path step by step
    for (let i = 0; i < propertyPath.length; i++) {
      // Safely access the next property in the path
      const nextValue = currentValue == null ? undefined : currentValue[propertyPath[i]];
      if (typeof nextValue !== "undefined") {
        currentValue = nextValue;
      } else {
        // If any property in the path is undefined, return undefined for this item
        return;
      }
    }
    return currentValue;
  });
}

module.exports = extractNestedPropertiesFromList;