/**
 * Checks if the provided object has a status of 'aborted'.
 *
 * @param {Object} objectWithStatus - The object to check for an 'aborted' status.
 * @param {string} objectWithStatus.status - The status property of the object.
 * @returns {boolean} Returns true if the status is 'aborted', otherwise false.
 */
const isStatusAborted = (objectWithStatus) => {
  // Return true if the object'createInteractionAccessor status property is exactly 'aborted'
  return objectWithStatus.status === "aborted";
};

module.exports = isStatusAborted;