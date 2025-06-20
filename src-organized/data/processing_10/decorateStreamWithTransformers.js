/**
 * Enhances a Blob or ReadableStream payload with transformation methods for byte array, string, and web stream conversions.
 * Throws descriptive errors for unsupported types or missing polyfills.
 *
 * @param {Blob|ReadableStream} payload - The input payload to decorate (must be a Blob or ReadableStream).
 * @returns {Blob|ReadableStream} The original payload, decorated with transformation methods.
 * @throws {Error} If the payload is not a Blob or ReadableStream, or if required polyfills are missing.
 */
function decorateStreamWithTransformers(payload) {
  let proto, constructor, typeName;

  // Validate payload type: must be Blob or ReadableStream
  if (!isBlobInstance(payload) && !vhA.isReadableStream(payload)) {
    // Try to extract the constructor name for error reporting
    proto = payload?.__proto__;
    constructor = proto?.constructor;
    typeName = constructor?.name || payload;
    throw new Error(`Unexpected stream implementation, expect Blob or ReadableStream, got ${typeName}`);
  }

  let hasBeenConsumed = false;

  /**
   * Collects the payload into a byte array (Uint8Array).
   * Throws if already consumed.
   * @returns {Promise<Uint8Array>}
   */
  const transformToByteArray = async () => {
    if (hasBeenConsumed) {
      throw new Error(bhA);
    }
    hasBeenConsumed = true;
    return await B04.streamCollector(payload);
  };

  /**
   * Converts a Blob to a web stream using .stream(), with polyfill checks.
   * @param {Blob} blob
   * @returns {ReadableStream}
   * @throws {Error} If .stream() is not available (e.g., in React Native)
   */
  const blobToWebStream = (blob) => {
    if (typeof blob.stream !== "function") {
      throw new Error(`Cannot transform payload Blob to web stream. Please make sure the Blob.stream() is polyfilled.\nIf you are using React Native, this API is not yet supported, see: https://react-native.canny.io/feature-requests/createIterableHelper/fetch-streaming-body`);
    }
    return blob.stream();
  };

  /**
   * Converts the payload to a string in the specified encoding.
   * Supports base64, hex, utf8, or any encoding supported by TextDecoder.
   * @param {string} [encoding] - The encoding to use (base64, hex, utf8, etc.)
   * @returns {Promise<string>}
   * @throws {Error} If TextDecoder is not available for custom encodings.
   */
  const transformToString = async (encoding) => {
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
  };

  /**
   * Converts the payload to a web stream (ReadableStream).
   * Throws if already consumed.
   * @returns {ReadableStream}
   * @throws {Error} If the payload cannot be converted to a stream.
   */
  const transformToWebStream = () => {
    if (hasBeenConsumed) {
      throw new Error(bhA);
    }
    hasBeenConsumed = true;
    if (isBlobInstance(payload)) {
      // If payload is a Blob, use .stream()
      return blobToWebStream(payload);
    } else if (vhA.isReadableStream(payload)) {
      // Already a ReadableStream
      return payload;
    } else {
      throw new Error(`Cannot transform payload to web stream, got ${payload}`);
    }
  };

  // Attach transformation methods to the payload and return isBlobOrFileLikeObject
  return Object.assign(payload, {
    transformToByteArray,
    transformToString,
    transformToWebStream
  });
}

module.exports = decorateStreamWithTransformers;