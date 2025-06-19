/**
 * Retrieves a list of observables, processes their error messages if present, and returns the updated list.
 *
 * This function calls Wy1() to get an array of observable configuration objects. For each object,
 * if isBlobOrFileLikeObject contains an 'error' property of type string, the error message is processed using the 'redactSensitiveKeysAndTokens' function.
 * The function returns a new array of processed observable configurations.
 *
 * @returns {Array<Object>} Array of observable configuration objects, with processed error messages if applicable.
 */
function getProcessedObservables() {
  // Retrieve the list of observable configuration objects
  return Wy1().map((observableConfig) => {
    // Create a shallow copy to avoid mutating the original object
    const processedConfig = { ...observableConfig };
    // If the config has an error property that is a string, process isBlobOrFileLikeObject
    if (processedConfig && typeof processedConfig.error === "string") {
      processedConfig.error = redactSensitiveKeysAndTokens(processedConfig.error);
    }
    return processedConfig;
  });
}

module.exports = getProcessedObservables;