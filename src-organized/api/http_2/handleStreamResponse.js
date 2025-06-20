/**
 * Processes a stream response object and resolves isBlobOrFileLikeObject according to its type.
 * Handles different response types: text, json, arrayBuffer, blob, and bytes.
 * Ensures proper cleanup and error handling for the provided stream.
 *
 * @param {Object} responseObject - The response object containing stream data and metadata.
 * @param {string} responseObject.type - The type of response to process ("text", "json", "arrayBuffer", "blob", or "bytes").
 * @param {any} responseObject.body - The body of the response, format depends on type.
 * @param {Function} responseObject.resolve - Callback to resolve the processed response.
 * @param {Object} responseObject.stream - The stream object, used for cleanup on error.
 * @param {number} responseObject.length - The length of the response body.
 * @returns {void}
 */
function handleStreamResponse(responseObject) {
  const {
    type: responseType,
    body: responseBody,
    resolve: resolveCallback,
    stream: responseStream,
    length: responseLength
  } = responseObject;

  try {
    // Process response based on its type
    if (responseType === "text") {
      // Resolve with text content
      resolveCallback(decodeUtf8BufferArray(responseBody, responseLength));
    } else if (responseType === "json") {
      // Parse and resolve JSON content
      resolveCallback(JSON.parse(decodeUtf8BufferArray(responseBody, responseLength)));
    } else if (responseType === "arrayBuffer") {
      // Resolve with ArrayBuffer
      resolveCallback(concatenateUint8Arrays(responseBody, responseLength).buffer);
    } else if (responseType === "blob") {
      // Resolve with Blob, using stream'createInteractionAccessor content type
      resolveCallback(new Blob(responseBody, {
        type: responseStream[Hd0]
      }));
    } else if (responseType === "bytes") {
      // Resolve with raw bytes
      resolveCallback(concatenateUint8Arrays(responseBody, responseLength));
    }
    // Perform any necessary cleanup after processing
    finalizeStreamProcessing(responseObject);
  } catch (error) {
    // On error, destroy the stream and pass the error
    responseStream.destroy(error);
  }
}

module.exports = handleStreamResponse;
