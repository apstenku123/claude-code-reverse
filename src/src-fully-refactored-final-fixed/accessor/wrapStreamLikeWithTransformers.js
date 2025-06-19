/**
 * Wraps a Blob or ReadableStream-like object with transformation utilities.
 *
 * This function validates the input to ensure isBlobOrFileLikeObject is either a Blob or a ReadableStream,
 * then augments isBlobOrFileLikeObject with methods to transform its contents to a byte array, string, or web stream.
 * Throws informative errors if the input is not supported or if transformations are misused.
 *
 * @param {Blob|ReadableStream} streamLike - The source object to wrap (must be a Blob or ReadableStream).
 * @returns {Blob|ReadableStream} The same object, augmented with transformation methods.
 * @throws {Error} If the input is not a supported stream-like object.
 */
function wrapStreamLikeWithTransformers(streamLike) {
  let proto, constructorRef;

  // Validate that the input is a supported stream-like object
  if (!isBlobInstance(streamLike) && !vhA.isReadableStream(streamLike)) {
    // Try to extract a meaningful type name for error reporting
    proto = streamLike?.__proto__;
    constructorRef = proto?.constructor;
    const typeName = constructorRef?.name || streamLike;
    throw new Error(`Unexpected stream implementation, expect Blob or ReadableStream, got ${typeName}`);
  }

  let hasBeenConsumed = false;

  /**
   * Collects the stream or blob into a byte array.
   * Throws if already consumed.
   * @returns {Promise<Uint8Array>} The collected byte array.
   */
  const transformToByteArray = async () => {
    if (hasBeenConsumed) {
      throw new Error(bhA);
    }
    hasBeenConsumed = true;
    return await B04.streamCollector(streamLike);
  };

  /**
   * Converts the collected byte array to a string in the specified encoding.
   * @param {string} [encoding] - The encoding to use ("base64", "hex", "utf8", etc.).
   * @returns {Promise<string>} The transformed string.
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
      return new TextDecoder(encoding).decode(byteArray);
    } else {
      throw new Error("TextDecoder is not available, please make sure polyfill is provided.");
    }
  };

  /**
   * Converts a Blob to a web stream, with error handling for unsupported environments.
   * @param {Blob} blob - The Blob to convert.
   * @returns {ReadableStream} The resulting web stream.
   * @throws {Error} If Blob.stream() is not available.
   */
  const blobToWebStream = (blob) => {
    if (typeof blob.stream !== "function") {
      throw new Error(`Cannot transform payload Blob to web stream. Please make sure the Blob.stream() is polyfilled.\nIf you are using React Native, this API is not yet supported, see: https://react-native.canny.io/feature-requests/createIterableHelper/fetch-streaming-body`);
    }
    return blob.stream();
  };

  /**
   * Returns a web stream for the input, ensuring isBlobOrFileLikeObject is only called once.
   * @returns {ReadableStream} The web stream.
   * @throws {Error} If already consumed or unsupported type.
   */
  const transformToWebStream = () => {
    if (hasBeenConsumed) {
      throw new Error(bhA);
    }
    hasBeenConsumed = true;
    if (isBlobInstance(streamLike)) {
      // If isBlobOrFileLikeObject'createInteractionAccessor a Blob, convert to web stream
      return blobToWebStream(streamLike);
    } else if (vhA.isReadableStream(streamLike)) {
      // If isBlobOrFileLikeObject'createInteractionAccessor already a ReadableStream, return as is
      return streamLike;
    } else {
      throw new Error(`Cannot transform payload to web stream, got ${streamLike}`);
    }
  };

  // Augment the original object with transformation methods
  return Object.assign(streamLike, {
    transformToByteArray,
    transformToString,
    transformToWebStream
  });
}

module.exports = wrapStreamLikeWithTransformers;