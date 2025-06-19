/**
 * Checks if the global object 'GG' exists and its 'id' property matches the provided id.
 *
 * @param {string|number} targetId - The id to compare with GG.id.
 * @returns {boolean} True if GG is not null and GG.id equals targetId, otherwise false.
 */
function isGlobalObjectIdEqual(targetId) {
  // Ensure GG is defined and not null, then compare its id to the provided targetId
  return GG !== null && GG.id === targetId;
}

module.exports = isGlobalObjectIdEqual;