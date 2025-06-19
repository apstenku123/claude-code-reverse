/**
 * Processes a response body according to its type and resolves the result.
 *
 * Supported types: 'text', 'json', 'arrayBuffer', 'blob', 'bytes'.
 * On error, destroys the stream with the error.
 *
 * @param {Object} responseOptions - Options for processing the response body.
 * @param {string} responseOptions.type - The type of the response body ('text', 'json', 'arrayBuffer', 'blob', 'bytes').
 * @param {any} responseOptions.body - The raw response body data.
 * @param {Function} responseOptions.resolve - Function to call with the processed result.
 * @param {Object} responseOptions.stream - The stream object, used for error handling.
 * @param {number} responseOptions.length - The length of the response body (if applicable).
 * @returns {void}
 */
function processResponseBody(responseOptions) {
  const {
    type: responseType,
    body: responseBody,
    resolve: resolveResult,
    stream: responseStream,
    length: responseLength
  } = responseOptions;

  try {
    // Process the response body based on its type
    if (responseType === "text") {
      // Convert body to text and resolve
      resolveResult(decodeUtf8BufferArray(responseBody, responseLength));
    } else if (responseType === "json") {
      // Parse body as JSON and resolve
      resolveResult(JSON.parse(decodeUtf8BufferArray(responseBody, responseLength)));
    } else if (responseType === "arrayBuffer") {
      // Convert body to ArrayBuffer and resolve
      resolveResult(concatenateUint8Arrays(responseBody, responseLength).buffer);
    } else if (responseType === "blob") {
      // Convert body to Blob and resolve
      resolveResult(new Blob(responseBody, {
        type: responseStream[Hd0]
      }));
    } else if (responseType === "bytes") {
      // Convert body to bytes (Uint8Array or similar) and resolve
      resolveResult(concatenateUint8Arrays(responseBody, responseLength));
    }
    // Perform any necessary cleanup after resolving
    finalizeStreamProcessing(responseOptions);
  } catch (error) {
    // On error, destroy the stream with the error
    responseStream.destroy(error);
  }
}

module.exports = processResponseBody;