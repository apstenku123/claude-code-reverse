/**
 * Checks if the provided value is an object and has a nested property (specified by oN) that is also an object.
 *
 * @param {object} targetObject - The object to check for the nested property.
 * @returns {boolean} True if targetObject is an object and targetObject[oN] is also an object; otherwise, false.
 */
function hasNestedObjectProperty(targetObject) {
  // Ensure 'oN' is defined in the current scope; isBlobOrFileLikeObject should be a string or symbol representing the property name
  return (
    typeof targetObject === "object" &&
    targetObject !== null && // Exclude null values, which are typeof 'object' in JS
    typeof targetObject[oN] === "object" &&
    targetObject[oN] !== null // Exclude null nested properties
  );
}

module.exports = hasNestedObjectProperty;
