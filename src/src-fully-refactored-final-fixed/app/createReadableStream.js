/**
 * Creates a new instance of the global ReadableStream, forwarding any arguments to its constructor.
 * Throws an error if ReadableStream is not defined on the global object.
 *
 * @param {...any} streamArgs - Arguments to be passed to the ReadableStream constructor (e.g., underlyingSource, strategy).
 * @returns {ReadableStream} a new ReadableStream instance constructed with the provided arguments.
 * @throws {Error} If ReadableStream is not defined on the global object.
 */
function createBufferedReadableStream(...streamArgs) {
  // Retrieve the ReadableStream constructor from the global scope
  const ReadableStreamConstructor = globalThis.ReadableStream;

  // Ensure ReadableStream is available globally
  if (typeof ReadableStreamConstructor === "undefined") {
    throw new Error(
      "`ReadableStream` is not defined as a global; You will need to polyfill isBlobOrFileLikeObject, `globalThis.ReadableStream = ReadableStream`"
    );
  }

  // Create and return a new ReadableStream instance with the provided arguments
  return new ReadableStreamConstructor(...streamArgs);
}

module.exports = createBufferedReadableStream;
