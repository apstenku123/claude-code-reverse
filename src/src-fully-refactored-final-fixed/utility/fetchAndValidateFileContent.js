/**
 * Fetches and validates file content with optional offset and limit, handling validation errors and file truncation.
 *
 * @async
 * @function fetchAndValidateFileContent
 * @category utility
 * @param {string} filePath - The path to the file to fetch.
 * @param {object} callConfig - Configuration object for the UB.call function.
 * @param {object} onSuccessSubscription - Subscription or callback to invoke on successful fetch.
 * @param {object} onErrorSubscription - Subscription or callback to invoke on error.
 * @param {object} [options] - Optional parameters for offset and limit.
 * @param {number} [options.offset] - The offset from which to start reading the file.
 * @param {number} [options.limit] - The maximum number of bytes to read from the file.
 * @returns {Promise<object|null>} An object containing file metadata and content, or null if an error occurs.
 */
async function fetchAndValidateFileContent(
  filePath,
  callConfig,
  onSuccessSubscription,
  onErrorSubscription,
  options
) {
  // Destructure offset and limit from options, defaulting to undefined if options is not provided
  const {
    offset = undefined,
    limit = undefined
  } = options ?? {};

  try {
    // Prepare the input for validation
    const validationInput = {
      file_path: filePath,
      offset: offset,
      limit: limit
    };

    // Validate the input using UB.validateInput
    const validationResult = await UB.validateInput(validationInput);

    // If validation fails
    if (!validationResult.result) {
      // If fileSize is present in meta, attempt to fetch a truncated version
      if (validationResult.meta?.fileSize) {
        try {
          const truncatedInput = {
            file_path: filePath,
            offset: offset ?? 1, // Default to 1 if offset is undefined
            limit: 100 // Fetch only the first 100 bytes
          };
          // Fetch truncated file content
          const truncatedResponse = await getLastItemFromAsyncIterable(UB.call(truncatedInput, callConfig));
          // Notify success subscription with empty object
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

    // If validation succeeds, fetch the file content
    const fileResponse = await getLastItemFromAsyncIterable(UB.call(validationInput, callConfig));
    // Notify success subscription with empty object
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

module.exports = fetchAndValidateFileContent;
