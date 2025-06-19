/**
 * Prepares and validates the configuration object for an observable operation.
 * Ensures the 'fs' property is set, and prohibits the use of retries in sync API mode.
 *
 * @param {Object} observableConfig - The configuration object for the observable operation.
 * @returns {Object} The validated and prepared configuration object.
 * @throws {Error} Throws an error if retries are specified for the sync API.
 */
function prepareObservableConfig(observableConfig) {
  // Create a shallow copy to avoid mutating the original config
  const config = { ...observableConfig };

  // Ensure 'fs' property is set using addAsyncFsMethods, defaulting to Vr9 if not provided
  config.fs = addAsyncFsMethods(config.fs || Vr9);

  // Check if retries are specified in a way that is not allowed for sync API
  const hasDirectRetries = typeof config.retries === "number" && config.retries > 0;
  const hasNestedRetries = config.retries && typeof config.retries.retries === "number" && config.retries.retries > 0;

  if (hasDirectRetries || hasNestedRetries) {
    // Throw an error if retries are used with the sync API
    throw Object.assign(new Error("Cannot use retries with the sync api"), {
      code: "ESYNC"
    });
  }

  return config;
}

module.exports = prepareObservableConfig;