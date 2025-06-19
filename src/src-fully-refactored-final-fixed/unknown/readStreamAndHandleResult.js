/**
 * Reads from a stream using its reader and processes the result or error.
 *
 * @param {Object} sourceStreamWrapper - An object containing a ReadableStream under the 'stream' property.
 * @param {Function} handleSuccess - Callback to handle the successful result of reading the stream.
 * @param {Function} handleError - Callback to handle any errors that occur during reading.
 * @returns {Promise<void>} Resolves when the operation completes (either success or error).
 */
async function readStreamAndHandleResult(sourceStreamWrapper, handleSuccess, handleError) {
  let successCallback = handleSuccess;
  let errorCallback = handleError;
  let reader;

  // Attempt to get a reader from the stream
  try {
    reader = sourceStreamWrapper.stream.getReader();
  } catch (error) {
    // If getting the reader fails, handle the error and exit
    errorCallback(error);
    return;
  }

  // Attempt to read from the stream using the reader
  try {
    // readAllChunksFromStream is assumed to be an async function that reads from the reader
    const result = await readAllChunksFromStream(reader);
    successCallback(result);
  } catch (error) {
    // If reading fails, handle the error
    errorCallback(error);
  }
}

module.exports = readStreamAndHandleResult;