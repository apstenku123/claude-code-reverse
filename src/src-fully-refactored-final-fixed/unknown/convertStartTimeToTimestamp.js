/**
 * Converts an object'createInteractionAccessor `startTime` property (if present) to a `startTimestamp` property in seconds.
 * If `startTime` is not present, returns the object unchanged.
 *
 * @param {Object} inputObject - The object potentially containing a `startTime` property.
 * @returns {Object} a new object with `startTimestamp` (in seconds) instead of `startTime`, or the original object if `startTime` is absent.
 */
function convertStartTimeToTimestamp(inputObject) {
  // Check if the input object has a startTime property
  if (inputObject.startTime) {
    // Create a shallow copy to avoid mutating the original object
    const updatedObject = { ...inputObject };

    // Convert startTime to seconds using external utility and assign to startTimestamp
    updatedObject.startTimestamp = n21.spanTimeInputToSeconds(inputObject.startTime);

    // Remove the original startTime property
    delete updatedObject.startTime;

    return updatedObject;
  }
  // If no startTime, return the original object unchanged
  return inputObject;
}

module.exports = convertStartTimeToTimestamp;