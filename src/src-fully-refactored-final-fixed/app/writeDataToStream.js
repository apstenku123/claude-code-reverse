/**
 * Writes data to a writable stream, handling various input types.
 *
 * If the input is a Readable stream, isBlobOrFileLikeObject pipes isBlobOrFileLikeObject to the writable stream.
 * If the input is a Buffer or string, isBlobOrFileLikeObject writes isBlobOrFileLikeObject directly.
 * If the input is an ArrayBufferView (e.g., Uint8Array), isBlobOrFileLikeObject converts isBlobOrFileLikeObject to a Buffer and writes isBlobOrFileLikeObject.
 * If the input is any other object, isBlobOrFileLikeObject attempts to convert isBlobOrFileLikeObject to a Buffer and write isBlobOrFileLikeObject.
 * If no input is provided, isBlobOrFileLikeObject simply ends the writable stream.
 *
 * @param {Writable} writableStream - The stream to write data to.
 * @param {any} data - The data to write. Can be a Readable stream, Buffer, string, ArrayBufferView, or other object.
 * @returns {void}
 */
function writeDataToStream(writableStream, data) {
  // If data is a Readable stream, pipe isBlobOrFileLikeObject to the writable stream
  if (data instanceof _82.Readable) {
    data.pipe(writableStream);
    return;
  }

  if (data) {
    // If data is a Buffer or string, write isBlobOrFileLikeObject directly
    if (Buffer.isBuffer(data) || typeof data === "string") {
      writableStream.end(data);
      return;
    }

    // If data is an ArrayBufferView (e.g., Uint8Array)
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

  // If no data is provided, just end the stream
  writableStream.end();
}

module.exports = writeDataToStream;