/**
 * Handles reading from a stream and processes the result or error using provided callbacks.
 *
 * @param {Object} streamSource - An object containing a 'stream' property with a getReader() method.
 * @param {Function} onSuccess - Callback invoked with the result of reading the stream.
 * @param {Function} onError - Callback invoked if an error occurs while accessing or reading the stream.
 * @returns {Promise<void>} Resolves when processing is complete.
 */
async function handleStreamWithCallbacks(streamSource, onSuccess, onError) {
  let successCallback = onSuccess;
  let errorCallback = onError;
  let streamReader;

  // Attempt to get a reader from the stream
  try {
    streamReader = streamSource.stream.getReader();
  } catch (error) {
    // If getting the reader fails, invoke the error callback and exit
    errorCallback(error);
    return;
  }

  // Attempt to read from the stream using the reader
  try {
    const result = await readAllChunksFromStream(streamReader);
    successCallback(result);
  } catch (error) {
    // If reading fails, invoke the error callback
    errorCallback(error);
  }
}

module.exports = handleStreamWithCallbacks;