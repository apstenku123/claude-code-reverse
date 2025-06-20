/**
 * Wraps a given stream-like object with transformation utilities for converting to byte array, string, or WebStream.
 * Ensures the object is a Node.js Readable stream, or attempts to mix in SDK stream methods if not.
 * Throws descriptive errors for unsupported or already-consumed streams.
 *
 * @param {object} streamSource - The stream-like object to wrap. Should be a Node.js Readable stream or compatible.
 * @returns {object} The original streamSource, extended with transformation methods.
 * @throws {Error} If the streamSource is not a supported stream implementation.
 */
function wrapReadableStreamWithTransformers(streamSource) {
  let protoConstructor, protoConstructorName;
  // Check if the provided source is a Node.js Readable stream
  if (!(streamSource instanceof rT1.Readable)) {
    try {
      // Attempt to mix in SDK stream methods for compatibility
      return W04.sdkStreamMixin(streamSource);
    } catch (error) {
      // Try to extract a meaningful constructor name for error reporting
      protoConstructor = streamSource?.__proto__?.constructor;
      protoConstructorName = protoConstructor?.name || streamSource;
      throw new Error(
        `Unexpected stream implementation, expect Stream.Readable instance, got ${protoConstructorName}`
      );
    }
  }

  let isStreamConsumed = false;

  /**
   * Collects the entire stream into a Uint8Array.
   * Throws if the stream has already been consumed.
   * @returns {Promise<Uint8Array>} The collected byte array.
   */
  const transformToByteArray = async () => {
    if (isStreamConsumed) {
      throw new Error(uhA);
    }
    isStreamConsumed = true;
    return await D04.streamCollector(streamSource);
  };

  /**
   * Collects the stream and returns its contents as a string in the specified encoding.
   * Uses Buffer if the encoding is supported, otherwise uses TextDecoder.
   * @param {string} [encoding] - Optional encoding (e.g., 'utf8', 'base64').
   * @returns {Promise<string>} The string representation of the stream contents.
   */
  const transformToString = async (encoding) => {
    const byteArray = await transformToByteArray();
    if (encoding === undefined || Buffer.isEncoding(encoding)) {
      // Use Buffer for supported encodings
      return Y04.fromArrayBuffer(
        byteArray.buffer,
        byteArray.byteOffset,
        byteArray.byteLength
      ).toString(encoding);
    } else {
      // Use TextDecoder for unsupported encodings
      return new TextDecoder(encoding).decode(byteArray);
    }
  };

  /**
   * Converts the Node.js Readable stream to a WebStream.
   * Throws if the stream has already been consumed or is flowing.
   * @returns {ReadableStream} The WebStream representation of the stream.
   */
  const transformToWebStream = () => {
    if (isStreamConsumed) {
      throw new Error(uhA);
    }
    if (streamSource.readableFlowing !== null) {
      throw new Error("The stream has been consumed by other callbacks.");
    }
    if (typeof rT1.Readable.toWeb !== "function") {
      throw new Error(
        "Readable.toWeb() is not supported. Please ensure a polyfill is available."
      );
    }
    isStreamConsumed = true;
    return rT1.Readable.toWeb(streamSource);
  };

  // Attach the transformation methods to the stream object
  return Object.assign(streamSource, {
    transformToByteArray,
    transformToString,
    transformToWebStream
  });
}

module.exports = wrapReadableStreamWithTransformers;