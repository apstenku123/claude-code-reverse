/**
 * Checks if the provided object is a valid timestamp object.
 * a valid timestamp object must have both 'seconds' and 'nanos' properties of type number.
 *
 * @param {Object} timestampObject - The object to check for timestamp structure.
 * @returns {boolean} True if the object has numeric 'seconds' and 'nanos' properties, false otherwise.
 */
function isTimestampObject(timestampObject) {
  // Ensure both 'seconds' and 'nanos' properties exist and are numbers
  return (
    typeof timestampObject.seconds === "number" &&
    typeof timestampObject.nanos === "number"
  );
}

module.exports = isTimestampObject;