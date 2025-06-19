/**
 * Enhances a Node.js Readable stream with utility methods for transforming its data.
 * Throws an error if the provided object is not a Readable stream instance.
 *
 * @param {import('stream').Readable} readableStream - The Readable stream to decorate.
 * @returns {import('stream').Readable} The same stream instance, augmented with transformation methods.
 * @throws {Error} If the provided object is not a Readable stream.
 */
function decorateReadableStream(readableStream) {
  // Check if the input is a valid Readable stream
  if (!(readableStream instanceof pi1.Readable)) {
    // Attempt to extract the constructor name for error reporting
    const proto = readableStream?.__proto__;
    const constructor = proto?.constructor;
    const constructorName = constructor?.name || readableStream;
    throw new Error(`Unexpected stream implementation, expect Stream.Readable instance, got ${constructorName}`);
  }

  let isConsumed = false;

  /**
   * Collects the entire stream into a Uint8Array. Can only be called once.
   * @returns {Promise<Uint8Array>} The collected stream data.
   * @throws {Error} If the stream has already been consumed.
   */
  const collectStreamToByteArray = async () => {
    if (isConsumed) {
      throw new Error(h82); // h82: Error message for already consumed stream
    }
    isConsumed = true;
    return await Jm6.streamCollector(readableStream);
  };

  /**
   * Collects the stream and returns its contents as a string in the specified encoding.
   * @param {string} [encoding] - Optional encoding (e.g., 'utf8', 'base64').
   * @returns {Promise<string>} The stream contents as a string.
   */
  const collectStreamToString = async (encoding) => {
    const byteArray = await collectStreamToByteArray();
    // If encoding is not specified or is a valid Buffer encoding, use Buffer
    if (encoding === undefined || Buffer.isEncoding(encoding)) {
      return Xm6.fromArrayBuffer(byteArray.buffer, byteArray.byteOffset, byteArray.byteLength).toString(encoding);
    } else {
      // Otherwise, use TextDecoder for custom encodings
      return new Cm6.TextDecoder(encoding).decode(byteArray);
    }
  };

  /**
   * Converts the Node.js Readable stream to a Web Stream (ReadableStream).
   * Can only be called once and only if the stream is not already flowing.
   * @returns {ReadableStream} The Web Stream representation of the Node.js stream.
   * @throws {Error} If the stream has already been consumed or is already flowing.
   */
  const convertToWebStream = () => {
    if (isConsumed) {
      throw new Error(h82); // h82: Error message for already consumed stream
    }
    if (readableStream.readableFlowing !== null) {
      throw new Error("The stream has been consumed by other callbacks.");
    }
    if (typeof pi1.Readable.toWeb !== "function") {
      throw new Error("Readable.toWeb() is not supported. Please make sure you are using Node.js >= 17.0.0, or polyfill is available.");
    }
    isConsumed = true;
    return pi1.Readable.toWeb(readableStream);
  };

  // Attach the transformation methods to the stream instance
  return Object.assign(readableStream, {
    transformToByteArray: collectStreamToByteArray,
    transformToString: collectStreamToString,
    transformToWebStream: convertToWebStream
  });
}

module.exports = decorateReadableStream;