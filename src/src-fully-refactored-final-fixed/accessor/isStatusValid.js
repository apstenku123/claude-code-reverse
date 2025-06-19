/**
 * Checks if the given object'createInteractionAccessor status property is equal to 'valid'.
 *
 * @param {Object} objectWithStatus - The object to check for a valid status.
 * @returns {boolean} Returns true if the object'createInteractionAccessor status is 'valid', otherwise false.
 */
const isStatusValid = (objectWithStatus) => {
  // Check if the status property is strictly equal to 'valid'
  return objectWithStatus.status === "valid";
};

module.exports = isStatusValid;
