/**
 * Generates an error message indicating that the 'weight' property in a given key must be a positive integer.
 *
 * @param {string} propertyKey - The key in which the invalid 'weight' property was found.
 * @returns {string} Error message describing the invalid 'weight' property.
 */
const getInvalidWeightPropertyMessage = (propertyKey) => {
  // Return a descriptive error message for invalid 'weight' property
  return `Property 'weight' in key '${propertyKey}' must be a positive integer`;
};

module.exports = getInvalidWeightPropertyMessage;
