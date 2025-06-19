/**
 * Prepares and validates options for the synchronous API.
 * Ensures the 'fs' property is set, and throws an error if retries are configured (which are not allowed in sync mode).
 *
 * @param {Object} options - The options object to process for the sync API.
 * @returns {Object} The processed and validated options object.
 * @throws {Error} If retries are set, throws with code 'ESYNC'.
 */
function prepareSyncApiOptions(options) {
  // Clone the options object to avoid mutating the original
  const processedOptions = { ...options };

  // Ensure the 'fs' property is set using addAsyncFsMethods or Vr9 as fallback
  processedOptions.fs = addAsyncFsMethods(processedOptions.fs || Vr9);

  // Check if retries are configured (not allowed in sync API)
  const hasRetries = (
    typeof processedOptions.retries === "number" && processedOptions.retries > 0
  ) || (
    processedOptions.retries &&
    typeof processedOptions.retries.retries === "number" &&
    processedOptions.retries.retries > 0
  );

  if (hasRetries) {
    // Throw an error if retries are set
    throw Object.assign(
      new Error("Cannot use retries with the sync api"),
      { code: "ESYNC" }
    );
  }

  return processedOptions;
}

module.exports = prepareSyncApiOptions;