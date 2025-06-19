/**
 * Checks if the provided object has a status of "aborted".
 *
 * @param {Object} objectWithStatus - The object to check for aborted status.
 * @param {string} objectWithStatus.status - The status property of the object.
 * @returns {boolean} Returns true if the object'createInteractionAccessor status is "aborted", otherwise false.
 */
const isAbortedStatus = (objectWithStatus) => {
  // Return true if the status property is exactly 'aborted'
  return objectWithStatus.status === "aborted";
};

module.exports = isAbortedStatus;
