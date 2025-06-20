/**
 * Wraps a Blob or ReadableStream payload, providing transformation utilities.
 *
 * This function validates the input payload to ensure isBlobOrFileLikeObject is either a Blob or a ReadableStream.
 * It then augments the payload with methods to transform its contents into a byte array,
 * string (with various encodings), or a web stream. Throws informative errors for unsupported types.
 *
 * @param {Blob|ReadableStream} payload - The payload to wrap and transform.
 * @returns {Blob|ReadableStream} The original payload, augmented with transformation methods.
 * @throws {Error} If the payload is not a Blob or ReadableStream, or if transformations are misused.
 */
function wrapStreamPayload(payload) {
  let payloadPrototype, payloadConstructor;

  // Validate that the payload is either a Blob or a ReadableStream
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
   * Collects the payload into a byte array. Can only be called once.
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
     * Transforms the payload into a byte array. Can only be called once.
     * @returns {Promise<Uint8Array>} The payload as a byte array.
     */
    transformToByteArray,

    /**
     * Transforms the payload into a string with the specified encoding.
     * Supported encodings: 'base64', 'hex', 'utf8', 'utf-8', or any encoding supported by TextDecoder.
     * @param {string} [encoding] - The desired encoding.
     * @returns {Promise<string>} The payload as a string in the specified encoding.
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
     * Transforms the payload into a web stream.
     * Can only be called before any other transformation.
     * @returns {ReadableStream} The payload as a web stream.
     * @throws {Error} If called after another transformation or if conversion is not possible.
     */
    transformToWebStream: () => {
      if (hasBeenTransformed) {
        throw new Error(bhA);
      }
      hasBeenTransformed = true;
      if (isBlobInstance(payload)) {
        // If isBlobOrFileLikeObject'createInteractionAccessor a Blob, convert to web stream
        return blobToWebStream(payload);
      } else if (vhA.isReadableStream(payload)) {
        // If isBlobOrFileLikeObject'createInteractionAccessor already a ReadableStream, return as is
        return payload;
      } else {
        throw new Error(
          `Cannot transform payload to web stream, got ${payload}`
        );
      }
    }
  });
}

module.exports = wrapStreamPayload;
