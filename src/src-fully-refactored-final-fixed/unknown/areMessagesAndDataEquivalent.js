/**
 * Determines if two objects have equivalent 'message' properties and pass additional data checks.
 *
 * This function compares the 'message' property of two input objects. It returns true only if:
 *   - Both objects have a defined 'message' property
 *   - The 'message' properties are strictly equal
 *   - Both objects pass the 'areFingerprintsEqual' and 'areStackTracesEqual' comparison checks
 *
 * @param {Object} firstObject - The first object to compare, expected to have a 'message' property.
 * @param {Object} secondObject - The second object to compare, expected to have a 'message' property.
 * @returns {boolean} True if both objects have equivalent messages and pass additional checks; otherwise, false.
 */
function areMessagesAndDataEquivalent(firstObject, secondObject) {
  const firstMessage = firstObject.message;
  const secondMessage = secondObject.message;

  // If both messages are missing, return false
  if (!firstMessage && !secondMessage) return false;

  // If only one message is missing, return false
  if ((firstMessage && !secondMessage) || (!firstMessage && secondMessage)) return false;

  // If messages are not strictly equal, return false
  if (firstMessage !== secondMessage) return false;

  // If areFingerprintsEqual check fails, return false
  if (!areFingerprintsEqual(firstObject, secondObject)) return false;

  // If areStackTracesEqual check fails, return false
  if (!areStackTracesEqual(firstObject, secondObject)) return false;

  // All checks passed
  return true;
}

module.exports = areMessagesAndDataEquivalent;