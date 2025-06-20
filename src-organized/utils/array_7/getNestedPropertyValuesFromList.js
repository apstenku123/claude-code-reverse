/**
 * Retrieves nested property values from each object in the global 'kj9' array, following a specified property path.
 *
 * @param {...string} propertyPath - One or more property names representing the path to traverse in each object.
 * @returns {Array<any>} An array containing the value at the specified nested property path for each object in 'kj9'.
 * @throws {Error} If no property path is provided.
 *
 * @example
 * // If kj9 = [{a: {b: 1}}, {a: {b: 2}}, {a: {c: 3}}]
 * getNestedPropertyValuesFromList('a', 'b'); // returns [1, 2, undefined]
 */
function getNestedPropertyValuesFromList(...propertyPath) {
  // Ensure at least one property is specified
  if (propertyPath.length === 0) {
    throw new Error("list of properties cannot be empty.");
  }

  // Map over each object in the global 'kj9' array
  return kj9.map((item) => {
    let currentValue = item;
    // Traverse the object along the specified property path
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

module.exports = getNestedPropertyValuesFromList;