/**
 * Converts the 'startTime' property of the given object to a 'startTimestamp' property in seconds.
 * If 'startTime' is not present, returns the object unchanged.
 *
 * @param {Object} sourceObject - The object that may contain a 'startTime' property.
 * @returns {Object} a new object with 'startTimestamp' (in seconds) if 'startTime' was present, otherwise the original object.
 */
function normalizeStartTimeProperty(sourceObject) {
  // Check if the input object has a 'startTime' property
  if (sourceObject.startTime) {
    // Create a shallow copy to avoid mutating the original object
    const normalizedObject = {
      ...sourceObject
    };
    // Convert 'startTime' to seconds and assign to 'startTimestamp'
    normalizedObject.startTimestamp = n21.spanTimeInputToSeconds(sourceObject.startTime);
    // Remove the original 'startTime' property
    delete normalizedObject.startTime;
    return normalizedObject;
  }
  // If 'startTime' is not present, return the original object
  return sourceObject;
}

module.exports = normalizeStartTimeProperty;