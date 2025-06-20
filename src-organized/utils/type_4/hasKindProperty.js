/**
 * Checks whether the provided object has a truthy 'kind' property.
 *
 * @param {Object} sourceObject - The object to check for the 'kind' property.
 * @returns {boolean} True if the 'kind' property exists and is truthy; otherwise, false.
 */
const hasKindProperty = (sourceObject) => {
  // Double negation (!!) converts the value to a boolean
  return !!sourceObject.kind;
};

module.exports = hasKindProperty;
