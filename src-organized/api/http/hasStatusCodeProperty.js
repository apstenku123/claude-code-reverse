/**
 * Checks if the provided object has a defined 'statusCode' property.
 *
 * @param {object} responseObject - The object to check for a 'statusCode' property.
 * @returns {boolean} Returns true if 'statusCode' is defined on the object, false otherwise.
 */
function hasStatusCodeProperty(responseObject) {
  // Ensure the object exists and has a defined 'statusCode' property
  return responseObject && responseObject.statusCode !== undefined;
}

module.exports = hasStatusCodeProperty;