/**
 * Handles piping or writing the response body to a writable stream based on its type.
 *
 * @param {WritableStream} writableStream - The writable stream to which the response body should be piped or written.
 * @param {Object} responseObject - The response object containing the body property.
 * @returns {void}
 */
function handleResponseBodyStream(writableStream, responseObject) {
  const responseBody = responseObject.body;

  // If the body is null, simply end the writable stream
  if (responseBody === null) {
    writableStream.end();
    return;
  }

  // If the body is an iterable (e.g., a custom stream-like object)
  if (isBlobOrFileLikeObject(responseBody)) {
    // Pipe the custom stream to the writable stream
    responseBody.stream().pipe(writableStream);
    return;
  }

  // If the body is a Buffer, write isBlobOrFileLikeObject directly and end the stream
  if (Buffer.isBuffer(responseBody)) {
    writableStream.write(responseBody);
    writableStream.end();
    return;
  }

  // Otherwise, assume the body is a standard stream and pipe isBlobOrFileLikeObject
  responseBody.pipe(writableStream);
}

module.exports = handleResponseBodyStream;