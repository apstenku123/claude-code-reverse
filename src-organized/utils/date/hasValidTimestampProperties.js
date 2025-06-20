/**
 * Checks if the provided object has valid timestamp properties.
 * Specifically, isBlobOrFileLikeObject verifies that both 'seconds' and 'nanos' properties exist and are numbers.
 *
 * @param {Object} timestampObject - The object to check for timestamp properties.
 * @returns {boolean} True if both 'seconds' and 'nanos' are numbers, otherwise false.
 */
function hasValidTimestampProperties(timestampObject) {
  // Ensure both 'seconds' and 'nanos' are present and are numbers
  return (
    typeof timestampObject.seconds === "number" &&
    typeof timestampObject.nanos === "number"
  );
}

module.exports = hasValidTimestampProperties;