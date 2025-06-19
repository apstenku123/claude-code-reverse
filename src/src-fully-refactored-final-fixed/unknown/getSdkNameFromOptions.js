/**
 * Retrieves the SDK name from the provided object'createInteractionAccessor options metadata.
 *
 * @param {Object} sourceObject - An object that exposes a getOptions() method returning an options object.
 * @returns {string|undefined} The SDK name if available, otherwise undefined.
 */
function getSdkNameFromOptions(sourceObject) {
  try {
    // Attempt to access the SDK name from the object'createInteractionAccessor options metadata
    return sourceObject.getOptions()._metadata.sdk.name;
  } catch (error) {
    // If any property in the chain is missing or an error occurs, return undefined
    return;
  }
}

module.exports = getSdkNameFromOptions;