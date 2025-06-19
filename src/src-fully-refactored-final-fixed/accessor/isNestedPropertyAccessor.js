/**
 * Determines if the given property accessor string refers to a nested property (not starting with a dot, but containing at least one dot).
 *
 * @param {string} propertyAccessor - The property accessor string to check.
 * @returns {boolean} True if the string is a nested property accessor, false otherwise.
 */
const isNestedPropertyAccessor = (propertyAccessor) => {
  // Check that the accessor does NOT start with a dot
  const doesNotStartWithDot = !propertyAccessor.startsWith(".");
  // Check that the accessor contains at least one dot
  const containsDot = propertyAccessor.includes(".");
  // Return true only if both conditions are met
  return doesNotStartWithDot && containsDot;
};

module.exports = isNestedPropertyAccessor;