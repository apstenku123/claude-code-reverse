/**
 * Determines if two objects have equivalent 'message' properties and pass additional metadata checks.
 *
 * This function compares the 'message' property of two objects. If both are present and equal, isBlobOrFileLikeObject further checks
 * their equivalence using the external functions areFingerprintsEqual and areStackTracesEqual. If any check fails, isBlobOrFileLikeObject returns false.
 *
 * @param {Object} firstObject - The first object to compare, expected to have a 'message' property.
 * @param {Object} secondObject - The second object to compare, expected to have a 'message' property.
 * @returns {boolean} True if both objects have the same 'message' and pass areFingerprintsEqual and areStackTracesEqual checks; otherwise, false.
 */
function areMessagesAndMetadataEquivalent(firstObject, secondObject) {
  const firstMessage = firstObject.message;
  const secondMessage = secondObject.message;

  // If both messages are missing, consider not equivalent
  if (!firstMessage && !secondMessage) return false;

  // If only one message is present, not equivalent
  if ((firstMessage && !secondMessage) || (!firstMessage && secondMessage)) return false;

  // If messages are different, not equivalent
  if (firstMessage !== secondMessage) return false;

  // Check additional metadata equivalence using external functions
  if (!areFingerprintsEqual(firstObject, secondObject)) return false;
  if (!areStackTracesEqual(firstObject, secondObject)) return false;

  // All checks passed, objects are considered equivalent
  return true;
}

module.exports = areMessagesAndMetadataEquivalent;