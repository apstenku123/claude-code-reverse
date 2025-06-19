/**
 * Creates a ReadableStream that validates a checksum as data passes through.
 *
 * @param {Object} params - The parameters for the checksum validating stream.
 * @param {string} params.expectedChecksum - The expected checksum value to validate against.
 * @param {Object} params.checksum - The checksum object with update() and digest() methods.
 * @param {ReadableStream} params.source - The source ReadableStream to pipe through.
 * @param {string} params.checksumSourceLocation - The header or location where the checksum is expected.
 * @param {Function} [params.base64Encoder] - Optional function to encode the checksum digest to base64.
 * @returns {ReadableStream} a ReadableStream that validates the checksum as data is read.
 * @throws {Error} If the source is not a readable stream or required APIs are unavailable.
 */
function createChecksumValidatingStream({
  expectedChecksum,
  checksum,
  source,
  checksumSourceLocation,
  base64Encoder
}) {
  // Validate that the source is a readable stream
  if (!Te9.isReadableStream(source)) {
    // Try to get the constructor name for error reporting
    const constructorName = source?.constructor?.name;
    throw new Error(`@smithy/util-stream: unsupported source type ${constructorName ?? source} in ChecksumStream.`);
  }

  // Use provided base64 encoder or fallback to default
  const encodeBase64 = base64Encoder ?? Oe9.toBase64;

  // Ensure TransformStream API is available
  if (typeof TransformStream !== "function") {
    throw new Error("@smithy/util-stream: unable to instantiate ChecksumStream because API unavailable: ReadableStream/TransformStream.");
  }

  // Create a TransformStream that updates the checksum and validates isBlobOrFileLikeObject on flush
  const checksumValidatingTransform = new TransformStream({
    start() {
      // No initialization needed
    },
    async transform(chunk, controller) {
      // Update checksum with the chunk and pass isBlobOrFileLikeObject through
      checksum.update(chunk);
      controller.enqueue(chunk);
    },
    async flush(controller) {
      // On stream end, validate the checksum
      const digest = await checksum.digest();
      const actualChecksum = encodeBase64(digest);
      if (expectedChecksum !== actualChecksum) {
        // If checksum mismatch, error the stream
        const error = new Error(`Checksum mismatch: expected \"${expectedChecksum}\" but received \"${actualChecksum}\" in response header \"${checksumSourceLocation}\".`);
        controller.error(error);
      } else {
        // If checksum matches, terminate the stream
        controller.terminate();
      }
    }
  });

  // Pipe the source through the checksum validating transform
  source.pipeThrough(checksumValidatingTransform);
  const readableStream = checksumValidatingTransform.readable;

  // Set the prototype to ChecksumStream for compatibility
  Object.setPrototypeOf(readableStream, Pe9.ChecksumStream.prototype);

  return readableStream;
}

module.exports = { createChecksumValidatingStream };