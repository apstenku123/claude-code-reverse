/**
 * Determines if auto session tracking is enabled based on the provided source object.
 *
 * This function checks if the given object has a getOptions method, and if so,
 * whether the returned options object has the 'autoSessionTracking' property defined.
 * If the property exists, its value is returned; otherwise, false is returned.
 *
 * @param {Object} sourceObject - The object to check for auto session tracking configuration. Should implement getOptions().
 * @returns {boolean} True if auto session tracking is enabled, false otherwise.
 */
function isAutoSessionTrackingEnabled(sourceObject) {
  // Return false if the source object is undefined
  if (sourceObject === undefined) return false;

  // Attempt to retrieve the options object via getOptions(), if available
  const options = sourceObject && sourceObject.getOptions();

  // If options exist and autoSessionTracking is explicitly set, return its value
  if (options && options.autoSessionTracking !== undefined) {
    return options.autoSessionTracking;
  }

  // Default to false if autoSessionTracking is not set
  return false;
}

module.exports = isAutoSessionTrackingEnabled;