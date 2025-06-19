/**
 * Attaches transformation methods to a Blob or ReadableStream-like object, enabling conversion to byte array, string, or web stream.
 *
 * @param {Blob|ReadableStream} sourceStream - The input object, expected to be a Blob or a ReadableStream.
 * @returns {Blob|ReadableStream} The same object, extended with transformation methods: transformToByteArray, transformToString, and transformToWebStream.
 * @throws {Error} If the input is not a Blob or ReadableStream, or if required APIs are missing.
 */
function attachStreamTransformers(sourceStream) {
  // Validate that the input is either a Blob or a ReadableStream
  if (!isBlobInstance(sourceStream) && !vhA.isReadableStream(sourceStream)) {
    // Attempt to get the constructor name for error reporting
    const proto = sourceStream?.__proto__;
    const constructor = proto?.constructor;
    const typeName = constructor?.name || sourceStream;
    throw new Error(`Unexpected stream implementation, expect Blob or ReadableStream, got ${typeName}`);
  }

  let hasBeenConsumed = false; // Prevent multiple consumptions of the stream

  /**
   * Collects the stream or blob into a byte array. Throws if already consumed.
   * @returns {Promise<Uint8Array>} The collected byte array.
   */
  const transformToByteArray = async () => {
    if (hasBeenConsumed) {
      throw new Error(bhA);
    }
    hasBeenConsumed = true;
    return await B04.streamCollector(sourceStream);
  };

  /**
   * Converts the stream/blob to a string in the specified encoding.
   * @param {string} [encoding] - The encoding to use ("base64", "hex", "utf8", etc.).
   * @returns {Promise<string>} The resulting string.
   */
  const transformToString = async (encoding) => {
    const byteArray = await transformToByteArray();
    if (encoding === "base64") {
      return Q04.toBase64(byteArray);
    } else if (encoding === "hex") {
      return I04.toHex(byteArray);
    } else if (encoding === undefined || encoding === "utf8" || encoding === "utf-8") {
      return G04.toUtf8(byteArray);
    } else if (typeof TextDecoder === "function") {
      // Use TextDecoder for custom encodings if available
      return new TextDecoder(encoding).decode(byteArray);
    } else {
      throw new Error("TextDecoder is not available, please make sure polyfill is provided.");
    }
  };

  /**
   * Converts a Blob to a web stream using its .stream() method.
   * Throws if .stream() is not available.
   * @param {Blob} blob - The Blob to convert.
   * @returns {ReadableStream} The resulting web stream.
   */
  const blobToWebStream = (blob) => {
    if (typeof blob.stream !== "function") {
      throw new Error(
        `Cannot transform payload Blob to web stream. Please make sure the Blob.stream() is polyfilled.\nIf you are using React Native, this API is not yet supported, see: https://react-native.canny.io/feature-requests/createIterableHelper/fetch-streaming-body`
      );
    }
    return blob.stream();
  };

  /**
   * Returns a web stream from the source, consuming isBlobOrFileLikeObject if necessary.
   * Throws if already consumed.
   * @returns {ReadableStream}
   */
  const transformToWebStream = () => {
    if (hasBeenConsumed) {
      throw new Error(bhA);
    }
    hasBeenConsumed = true;
    if (isBlobInstance(sourceStream)) {
      // If isBlobOrFileLikeObject'createInteractionAccessor a Blob, convert to stream
      return blobToWebStream(sourceStream);
    } else if (vhA.isReadableStream(sourceStream)) {
      // If isBlobOrFileLikeObject'createInteractionAccessor already a ReadableStream, return as is
      return sourceStream;
    } else {
      throw new Error(`Cannot transform payload to web stream, got ${sourceStream}`);
    }
  };

  // Attach transformation methods to the original object
  return Object.assign(sourceStream, {
    transformToByteArray,
    transformToString,
    transformToWebStream
  });
}

module.exports = attachStreamTransformers;