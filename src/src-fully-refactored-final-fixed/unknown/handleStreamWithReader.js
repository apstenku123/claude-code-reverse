/**
 * Handles reading from a stream using its reader, and manages success and error callbacks.
 *
 * @param {Object} sourceObservable - The object containing the stream to read from. Must have a 'stream' property with a 'getReader' method.
 * @param {Function} onSuccess - Callback to invoke with the result of reading the stream.
 * @param {Function} onError - Callback to invoke if an error occurs while getting the reader or reading the stream.
 * @returns {Promise<void>} Resolves when the operation is complete.
 */
async function handleStreamWithReader(sourceObservable, onSuccess, onError) {
  let successCallback = onSuccess;
  let errorCallback = onError;
  let reader;

  // Attempt to get the reader from the stream
  try {
    reader = sourceObservable.stream.getReader();
  } catch (error) {
    // If getting the reader fails, call the error callback and exit
    errorCallback(error);
    return;
  }

  // Attempt to read from the stream using the reader
  try {
    // readAllChunksFromStream is assumed to be an async function that reads from the reader
    const result = await readAllChunksFromStream(reader);
    successCallback(result);
  } catch (error) {
    // If reading fails, call the error callback
    errorCallback(error);
  }
}

module.exports = handleStreamWithReader;