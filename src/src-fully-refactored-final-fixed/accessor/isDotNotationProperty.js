/**
 * Determines if a given property path string uses dot notation (e.g., 'foo.bar')
 * but does not start with a dot (e.g., '.foo').
 *
 * @param {string} propertyPath - The property path string to check.
 * @returns {boolean} True if the string contains a dot and does not start with a dot; otherwise, false.
 */
const isDotNotationProperty = (propertyPath) => {
  // Check that the property path does not start with a dot
  const doesNotStartWithDot = !propertyPath.startsWith(".");
  // Check that the property path contains at least one dot
  const containsDot = propertyPath.includes(".");
  // Return true only if both conditions are met
  return doesNotStartWithDot && containsDot;
};

module.exports = isDotNotationProperty;
