/**
 * Decorates a Blob or ReadableStream-like payload with transformation methods.
 *
 * This function checks if the provided payload is a Blob or a ReadableStream. If so, isBlobOrFileLikeObject attaches methods to:
 *   - Convert the payload to a byte array
 *   - Convert the payload to a string in various encodings
 *   - Convert the payload to a web stream
 * Throws an error if the payload is not a supported type.
 *
 * @param {Blob|ReadableStream} payload - The input payload to decorate. Must be a Blob or ReadableStream.
 * @returns {Blob|ReadableStream} The original payload, decorated with transformation methods.
 * @throws {Error} If the payload is not a Blob or ReadableStream.
 */
function decorateStreamLikePayload(payload) {
  let payloadPrototype, payloadConstructor;

  // Validate payload type: must be Blob or ReadableStream
  if (!isBlobInstance(payload) && !vhA.isReadableStream(payload)) {
    // Try to extract the constructor name for error reporting
    payloadPrototype = payload?.__proto__;
    payloadConstructor = payloadPrototype?.constructor;
    const payloadTypeName = payloadConstructor?.name || payload;
    throw new Error(
      `Unexpected stream implementation, expect Blob or ReadableStream, got ${payloadTypeName}`
    );
  }

  let hasBeenTransformed = false;

  /**
   * Collects the payload as a byte array. Can only be called once.
   * @returns {Promise<Uint8Array>} The byte array representation of the payload.
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
   * Converts a Blob to a web stream, with error handling for missing polyfills.
   * @param {Blob} blobPayload
   * @returns {ReadableStream}
   * @throws {Error} If Blob.stream() is not available.
   */
  const blobToWebStream = (blobPayload) => {
    if (typeof blobPayload.stream !== "function") {
      throw new Error(
        `Cannot transform payload Blob to web stream. Please make sure the Blob.stream() is polyfilled.\n` +
        `If you are using React Native, this API is not yet supported, see: https://react-native.canny.io/feature-requests/createIterableHelper/fetch-streaming-body`
      );
    }
    return blobPayload.stream();
  };

  // Attach transformation methods to the payload
  return Object.assign(payload, {
    /**
     * Converts the payload to a byte array. Can only be called once.
     * @returns {Promise<Uint8Array>}
     */
    transformToByteArray,

    /**
     * Converts the payload to a string in the specified encoding.
     * Supported encodings: 'base64', 'hex', 'utf8', 'utf-8', or any encoding supported by TextDecoder.
     * @param {string} [encoding] - The desired encoding.
     * @returns {Promise<string>} The string representation of the payload.
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
     * Converts the payload to a web stream. Can only be called once.
     * @returns {ReadableStream}
     * @throws {Error} If called more than once or if payload is not convertible.
     */
    transformToWebStream: () => {
      if (hasBeenTransformed) {
        throw new Error(bhA);
      }
      hasBeenTransformed = true;
      if (isBlobInstance(payload)) {
        // Blob case
        return blobToWebStream(payload);
      } else if (vhA.isReadableStream(payload)) {
        // Already a ReadableStream
        return payload;
      } else {
        throw new Error(`Cannot transform payload to web stream, got ${payload}`);
      }
    }
  });
}

module.exports = decorateStreamLikePayload;
