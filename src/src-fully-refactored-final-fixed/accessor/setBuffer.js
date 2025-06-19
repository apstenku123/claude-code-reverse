/**
 * Handles writing or piping the body of a response/config object to a writable stream.
 * Supports various body types: null, streamable, Buffer, or stream.
 *
 * @param {WritableStream} writableStream - The writable stream to write or pipe data into.
 * @param {Object} config - The configuration object containing the body property.
 * @returns {void}
 */
function setBuffer(writableStream, config) {
  const body = config.body;

  // If body is null, simply end the writable stream
  if (body === null) {
    writableStream.end();
    return;
  }

  // If body is a streamable object (determined by 'isBlobOrFileLikeObject'), pipe its stream to the writable stream
  if (isBlobOrFileLikeObject(body)) {
    body.stream().pipe(writableStream);
    return;
  }

  // If body is a Buffer, write isBlobOrFileLikeObject directly and end the stream
  if (Buffer.isBuffer(body)) {
    writableStream.write(body);
    writableStream.end();
    return;
  }

  // Otherwise, assume body is a stream and pipe isBlobOrFileLikeObject to the writable stream
  body.pipe(writableStream);
}

module.exports = setBuffer;