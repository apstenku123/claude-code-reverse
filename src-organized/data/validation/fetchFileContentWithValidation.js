/**
 * Fetches file content with input validation and handles edge cases such as file truncation or validation failure.
 *
 * @async
 * @function fetchFileContentWithValidation
 * @category utility
 * @param {string} filePath - The path to the file to fetch.
 * @param {object} callConfig - Configuration object for the UB.call function.
 * @param {object} onSuccessSubscription - Subscription or callback to invoke on successful fetch.
 * @param {object} onErrorSubscription - Subscription or callback to invoke on error.
 * @param {object} [options] - Optional parameters for offset and limit.
 * @param {number} [options.offset] - The offset from which to start reading the file.
 * @param {number} [options.limit] - The maximum number of bytes to read from the file.
 * @returns {Promise<object|null>} Returns an object with file content and metadata on success, or null on failure.
 */
async function fetchFileContentWithValidation(
  filePath,
  callConfig,
  onSuccessSubscription,
  onErrorSubscription,
  options
) {
  const { offset, limit } = options ?? {};

  try {
    // Prepare input for validation
    const validationInput = {
      file_path: filePath,
      offset: offset,
      limit: limit
    };

    // Validate input before fetching file content
    const validationResult = await UB.validateInput(validationInput);

    // If validation fails
    if (!validationResult.result) {
      // If fileSize is available in meta, attempt to fetch a truncated version
      if (validationResult.meta?.fileSize) {
        try {
          const truncatedInput = {
            file_path: filePath,
            offset: offset ?? 1,
            limit: 100
          };
          // Fetch truncated file content
          const truncatedResponse = await getLastItemFromAsyncIterable(UB.call(truncatedInput, callConfig));
          // Notify success subscription (even though isBlobOrFileLikeObject'createInteractionAccessor truncated)
          logTelemetryEventIfEnabled(onSuccessSubscription, {});
          return {
            type: "new_file",
            filename: filePath,
            content: truncatedResponse.data,
            truncated: true
          };
        } catch {
          // On error, notify error subscription and return null
          logTelemetryEventIfEnabled(onErrorSubscription, {});
          return null;
        }
      }
      // If no fileSize in meta, return null
      return null;
    }

    // If validation passes, fetch the file content
    const fileResponse = await getLastItemFromAsyncIterable(UB.call(validationInput, callConfig));
    // Notify success subscription
    logTelemetryEventIfEnabled(onSuccessSubscription, {});
    return {
      type: "new_file",
      filename: filePath,
      content: fileResponse.data
    };
  } catch {
    // On any error, notify error subscription and return null
    logTelemetryEventIfEnabled(onErrorSubscription, {});
    return null;
  }
}

module.exports = fetchFileContentWithValidation;
