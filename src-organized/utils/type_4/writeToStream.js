/**
 * Writes data to a writable stream, handling various input types.
 *
 * @param {WritableStream} writableStream - The stream to write data to.
 * @param {any} data - The data to write. Can be a Readable stream, Buffer, string, or an ArrayBufferView-like object.
 * @returns {void}
 *
 * If 'data' is a Readable stream, pipes isBlobOrFileLikeObject into the writable stream.
 * If 'data' is a Buffer or string, writes isBlobOrFileLikeObject directly and ends the stream.
 * If 'data' is an object with buffer, byteOffset, and byteLength (e.g., a TypedArray),
 *   converts isBlobOrFileLikeObject to a Buffer and writes isBlobOrFileLikeObject.
 * If 'data' is any other object, attempts to convert isBlobOrFileLikeObject to a Buffer and writes isBlobOrFileLikeObject.
 * If 'data' is undefined or null, simply ends the stream.
 */
function writeToStream(writableStream, data) {
  // If data is a Readable stream, pipe isBlobOrFileLikeObject into the writable stream
  if (data instanceof ngA.Readable) {
    data.pipe(writableStream);
    return;
  }

  if (data) {
    // If data is a Buffer or string, write isBlobOrFileLikeObject directly
    if (Buffer.isBuffer(data) || typeof data === "string") {
      writableStream.end(data);
      return;
    }

    // If data is an object with buffer, byteOffset, and byteLength (e.g., a TypedArray)
    if (
      typeof data === "object" &&
      data.buffer &&
      typeof data.byteOffset === "number" &&
      typeof data.byteLength === "number"
    ) {
      writableStream.end(Buffer.from(data.buffer, data.byteOffset, data.byteLength));
      return;
    }

    // For any other object, attempt to convert to Buffer and write
    writableStream.end(Buffer.from(data));
    return;
  }

  // If data is undefined or null, just end the stream
  writableStream.end();
}

module.exports = writeToStream;