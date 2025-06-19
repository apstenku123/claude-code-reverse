/**
 * Enhances a Blob or ReadableStream-like object with transformation methods for byte array, string, and web stream conversions.
 * Throws an error if the input is not a Blob or ReadableStream.
 *
 * @param {Blob|ReadableStream} source - The input object to decorate. Must be a Blob or ReadableStream.
 * @returns {Blob|ReadableStream} The same object, decorated with transformation methods.
 * @throws {Error} If the input is not a supported stream or blob type.
 */
function decorateStreamLikeWithTransformers(source) {
  // Check if the source is a supported Blob or ReadableStream
  if (!isBlobInstance(source) && !vhA.isReadableStream(source)) {
    // Try to get the constructor name for error reporting
    const proto = source?.__proto__;
    const constructor = proto?.constructor;
    const constructorName = constructor?.name || source;
    throw new Error(`Unexpected stream implementation, expect Blob or ReadableStream, got ${constructorName}`);
  }

  let hasBeenConsumed = false;

  /**
   * Collects the stream or blob into a byte array. Throws if already consumed.
   * @returns {Promise<Uint8Array>} The collected byte array.
   */
  const transformToByteArray = async () => {
    if (hasBeenConsumed) {
      throw new Error(bhA);
    }
    hasBeenConsumed = true;
    return await B04.streamCollector(source);
  };

  /**
   * Converts a Blob to a web stream using its .stream() method.
   * Throws if .stream is not available.
   * @param {Blob} blob - The Blob to convert.
   * @returns {ReadableStream} The resulting web stream.
   */
  const blobToWebStream = (blob) => {
    if (typeof blob.stream !== "function") {
      throw new Error(`Cannot transform payload Blob to web stream. Please make sure the Blob.stream() is polyfilled.\nIf you are using React Native, this API is not yet supported, see: https://react-native.canny.io/feature-requests/createIterableHelper/fetch-streaming-body`);
    }
    return blob.stream();
  };

  return Object.assign(source, {
    /**
     * Transforms the source into a byte array. Throws if already consumed.
     * @returns {Promise<Uint8Array>} The collected byte array.
     */
    transformToByteArray,

    /**
     * Transforms the source into a string using the specified encoding.
     * Supported encodings: 'base64', 'hex', 'utf8', 'utf-8', or any supported by TextDecoder.
     * Throws if already consumed or if TextDecoder is unavailable for custom encodings.
     * @param {string} [encoding] - The encoding to use for the string conversion.
     * @returns {Promise<string>} The resulting string.
     */
    transformToString: async (encoding) => {
      const byteArray = await transformToByteArray();
      if (encoding === "base64") {
        return Q04.toBase64(byteArray);
      } else if (encoding === "hex") {
        return I04.toHex(byteArray);
      } else if (
        encoding === undefined ||
        encoding === "utf8" ||
        encoding === "utf-8"
      ) {
        return G04.toUtf8(byteArray);
      } else if (typeof TextDecoder === "function") {
        return new TextDecoder(encoding).decode(byteArray);
      } else {
        throw new Error("TextDecoder is not available, please make sure polyfill is provided.");
      }
    },

    /**
     * Transforms the source into a web stream. Throws if already consumed.
     * @returns {ReadableStream} The resulting web stream.
     */
    transformToWebStream: () => {
      if (hasBeenConsumed) {
        throw new Error(bhA);
      }
      hasBeenConsumed = true;
      if (isBlobInstance(source)) {
        // If isBlobOrFileLikeObject'createInteractionAccessor a Blob, convert to web stream
        return blobToWebStream(source);
      } else if (vhA.isReadableStream(source)) {
        // If isBlobOrFileLikeObject'createInteractionAccessor already a ReadableStream, return as is
        return source;
      } else {
        throw new Error(`Cannot transform payload to web stream, got ${source}`);
      }
    }
  });
}

module.exports = decorateStreamLikeWithTransformers;