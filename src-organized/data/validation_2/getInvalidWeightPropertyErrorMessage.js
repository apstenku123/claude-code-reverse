/**
 * Generates an error message indicating that the 'weight' property in a given key must be a positive integer.
 *
 * @param {string} keyName - The name of the key containing the invalid 'weight' property.
 * @returns {string} Error message specifying the invalid 'weight' property for the given key.
 */
const getInvalidWeightPropertyErrorMessage = (keyName) => {
  // Construct and return the error message for the invalid 'weight' property
  return `Property 'weight' in key '${keyName}' must be a positive integer`;
};

module.exports = getInvalidWeightPropertyErrorMessage;
