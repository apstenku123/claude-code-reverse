/**
 * Checks if the given object'createInteractionAccessor status property is set to 'dirty'.
 *
 * @param {Object} objectWithStatus - The object to check for a 'dirty' status.
 * @returns {boolean} True if the object'createInteractionAccessor status is 'dirty', otherwise false.
 */
const isStatusDirty = (objectWithStatus) => {
  // Return true if the status property is exactly 'dirty'
  return objectWithStatus.status === "dirty";
};

module.exports = isStatusDirty;
