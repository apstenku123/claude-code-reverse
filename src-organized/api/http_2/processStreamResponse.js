/**
 * Processes a response object from a stream, parses or transforms its body based on the specified type,
 * and resolves the provided promise accordingly. Handles errors by destroying the stream.
 *
 * @param {Object} responseOptions - The response options object.
 * @param {string} responseOptions.type - The expected response type: 'text', 'json', 'arrayBuffer', 'blob', or 'bytes'.
 * @param {any} responseOptions.body - The response body data.
 * @param {Function} responseOptions.resolve - The function to resolve the response promise.
 * @param {Object} responseOptions.stream - The stream object, used for error handling.
 * @param {number} responseOptions.length - The length of the response body.
 * @returns {void}
 */
function processStreamResponse(responseOptions) {
  const {
    type: responseType,
    body: responseBody,
    resolve: resolveResponse,
    stream: responseStream,
    length: responseLength
  } = responseOptions;

  try {
    // Handle response based on its type
    if (responseType === "text") {
      // Resolve with plain text
      resolveResponse(decodeUtf8BufferArray(responseBody, responseLength));
    } else if (responseType === "json") {
      // Parse and resolve with JSON object
      resolveResponse(JSON.parse(decodeUtf8BufferArray(responseBody, responseLength)));
    } else if (responseType === "arrayBuffer") {
      // Resolve with ArrayBuffer
      resolveResponse(concatenateUint8Arrays(responseBody, responseLength).buffer);
    } else if (responseType === "blob") {
      // Resolve with Blob object, using the stream'createInteractionAccessor type property
      resolveResponse(new Blob(responseBody, {
        type: responseStream[Hd0]
      }));
    } else if (responseType === "bytes") {
      // Resolve with raw bytes
      resolveResponse(concatenateUint8Arrays(responseBody, responseLength));
    }
    // Perform any necessary cleanup or post-processing
    finalizeStreamProcessing(responseOptions);
  } catch (error) {
    // On error, destroy the stream and pass the error
    responseStream.destroy(error);
  }
}

module.exports = processStreamResponse;