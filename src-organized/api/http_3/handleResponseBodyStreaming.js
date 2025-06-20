/**
 * Handles streaming or writing the response body to a writable stream.
 *
 * Depending on the type of the response body, this function will:
 *   - End the writable stream if the body is null
 *   - Pipe a readable stream to the writable stream if the body is a stream
 *   - Write a Buffer directly and then end the writable stream if the body is a Buffer
 *   - Otherwise, attempt to pipe the body if isBlobOrFileLikeObject has a pipe method
 *
 * @param {WritableStream} writableStream - The writable stream to write or pipe the response body into.
 * @param {Object} responseConfig - The response configuration object containing the body property.
 * @returns {void}
 */
function handleResponseBodyStreaming(writableStream, responseConfig) {
  const { body: responseBody } = responseConfig;

  if (responseBody === null) {
    // If the response body is null, simply end the writable stream
    writableStream.end();
  } else if (isBlobOrFileLikeObject(responseBody)) {
    // If the response body is a custom stream-like object, pipe its stream to the writable stream
    responseBody.stream().pipe(writableStream);
  } else if (Buffer.isBuffer(responseBody)) {
    // If the response body is a Buffer, write isBlobOrFileLikeObject directly and end the stream
    writableStream.write(responseBody);
    writableStream.end();
  } else {
    // Otherwise, assume the response body is a readable stream and pipe isBlobOrFileLikeObject
    responseBody.pipe(writableStream);
  }
}

module.exports = handleResponseBodyStreaming;