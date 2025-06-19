/**
 * Generates an error message indicating a missing property in a key.
 *
 * @param {string} propertyName - The name of the missing property.
 * @returns {string} Error message specifying the missing property.
 */
const getMissingPropertyMessage = (propertyName) => {
  // Return a formatted error message for the missing property
  return `Missing ${propertyName} property in key`;
};

module.exports = getMissingPropertyMessage;
