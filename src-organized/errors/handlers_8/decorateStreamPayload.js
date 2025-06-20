/**
 * Decorates a Blob or ReadableStream payload with transformation methods.
 *
 * This function checks if the input is a valid Blob or ReadableStream. If not, isBlobOrFileLikeObject throws an error.
 * It then attaches utility methods to the payload for transforming isBlobOrFileLikeObject to a byte array, string, or web stream.
 *
 * @param {Blob|ReadableStream} payload - The payload to decorate. Must be a Blob or ReadableStream.
 * @returns {Blob|ReadableStream} The original payload, decorated with transformation methods.
 * @throws {Error} If the payload is not a Blob or ReadableStream, or if transformations are attempted multiple times.
 */
function decorateStreamPayload(payload) {
  // Check if payload is a Blob or ReadableStream
  if (!isBlobInstance(payload) && !vhA.isReadableStream(payload)) {
    // Try to get the constructor name for error reporting
    const proto = payload?.__proto__;
    const constructor = proto?.constructor;
    const constructorName = constructor?.name || payload;
    throw new Error(
      `Unexpected stream implementation, expect Blob or ReadableStream, got ${constructorName}`
    );
  }

  let hasBeenTransformed = false;

  /**
   * Collects the stream or blob into a byte array. Can only be called once.
   * @returns {Promise<Uint8Array>} The collected byte array.
   * @throws {Error} If called more than once.
   */
  const transformToByteArray = async () => {
    if (hasBeenTransformed) {
      throw new Error(bhA);
    }
    hasBeenTransformed = true;
    return await B04.streamCollector(payload);
  };

  /**
   * Converts a Blob to a web stream using its .stream() method.
   * @param {Blob} blob - The Blob to convert.
   * @returns {ReadableStream} The resulting web stream.
   * @throws {Error} If .stream() is not available.
   */
  const blobToWebStream = (blob) => {
    if (typeof blob.stream !== "function") {
      throw new Error(
        `Cannot transform payload Blob to web stream. Please make sure the Blob.stream() is polyfilled.\n` +
        `If you are using React Native, this API is not yet supported, see: https://react-native.canny.io/feature-requests/createIterableHelper/fetch-streaming-body`
      );
    }
    return blob.stream();
  };

  return Object.assign(payload, {
    /**
     * Transforms the payload to a byte array. Can only be called once.
     * @returns {Promise<Uint8Array>} The collected byte array.
     */
    transformToByteArray,

    /**
     * Transforms the payload to a string in the specified encoding.
     * Supported encodings: 'base64', 'hex', 'utf8', 'utf-8', or any encoding supported by TextDecoder.
     *
     * @param {string} [encoding] - The encoding to use for the string.
     * @returns {Promise<string>} The resulting string.
     * @throws {Error} If TextDecoder is not available for custom encodings.
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
        throw new Error(
          "TextDecoder is not available, please make sure polyfill is provided."
        );
      }
    },

    /**
     * Transforms the payload to a web stream (ReadableStream).
     * Can only be called once.
     *
     * @returns {ReadableStream} The resulting web stream.
     * @throws {Error} If called more than once or if payload cannot be transformed.
     */
    transformToWebStream: () => {
      if (hasBeenTransformed) {
        throw new Error(bhA);
      }
      hasBeenTransformed = true;
      if (isBlobInstance(payload)) {
        // If isBlobOrFileLikeObject'createInteractionAccessor a Blob, use .stream()
        return blobToWebStream(payload);
      } else if (vhA.isReadableStream(payload)) {
        // If isBlobOrFileLikeObject'createInteractionAccessor already a ReadableStream, return as is
        return payload;
      } else {
        throw new Error(`Cannot transform payload to web stream, got ${payload}`);
      }
    }
  });
}

module.exports = decorateStreamPayload;
