/**
 * Extracts nested property values from each object in the 'kj9' array, using a sequence of property keys.
 *
 * @param {...string} propertyPath - One or more property names representing the path to pluck from each object.
 * @returns {Array<any>} An array containing the values found at the specified property path for each object in 'kj9'.
 * @throws {Error} If no property names are provided.
 */
function pluckPropertiesFromList(...propertyPath) {
  // Validate that at least one property name is provided
  if (propertyPath.length === 0) {
    throw new Error("list of properties cannot be empty.");
  }

  // Map over each item in the 'kj9' array and extract the nested property value
  return kj9.map((item) => {
    let currentValue = item;
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

module.exports = pluckPropertiesFromList;