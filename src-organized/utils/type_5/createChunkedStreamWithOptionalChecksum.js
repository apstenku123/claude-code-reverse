/**
 * Creates a chunked Readable stream from a source stream, optionally appending a checksum at the end.
 * Each chunk is prefixed with its length in hexadecimal, followed by CRLF, the chunk data, and another CRLF.
 * If checksum configuration is provided, computes and appends the checksum as the final chunk.
 *
 * @param {Readable} sourceStream - The input Readable stream to be chunked.
 * @param {Object} config - Configuration object for chunking and optional checksum.
 * @param {function(string|Buffer): number} config.bodyLengthChecker - Function to determine the length of each chunk.
 * @param {function} [config.base64Encoder] - Function to encode the checksum in base64 (required if checksum is used).
 * @param {function} [config.checksumAlgorithmFn] - Function to create a checksum hash (required if checksum is used).
 * @param {string} [config.checksumLocationName] - Name of the checksum header (required if checksum is used).
 * @param {function} [config.streamHasher] - Function to hash the stream (required if checksum is used).
 * @returns {Readable} a Readable stream emitting chunked data, optionally with a checksum chunk at the end.
 */
function createChunkedStreamWithOptionalChecksum(sourceStream, config) {
  const {
    base64Encoder,
    bodyLengthChecker,
    checksumAlgorithmFn,
    checksumLocationName,
    streamHasher
  } = config;

  // Determine if checksum functionality is enabled
  const isChecksumEnabled =
    base64Encoder !== undefined &&
    checksumAlgorithmFn !== undefined &&
    checksumLocationName !== undefined &&
    streamHasher !== undefined;

  // If checksum is enabled, prepare the promise for the checksum hash
  const checksumPromise = isChecksumEnabled
    ? streamHasher(checksumAlgorithmFn, sourceStream)
    : undefined;

  // Create a new Readable stream for output
  const chunkedStream = new uh6.Readable({
    read: () => {}
  });

  // Handle incoming data chunks
  sourceStream.on("data", (chunk) => {
    // Determine the length of the chunk
    const chunkLength = bodyLengthChecker(chunk) || 0;
    // Write the chunk length in hexadecimal, followed by CRLF
    chunkedStream.push(`${chunkLength.toString(16)}\r\n`);
    // Write the actual chunk data
    chunkedStream.push(chunk);
    // Write trailing CRLF
    chunkedStream.push(`\r\n`);
  });

  // Handle end of the source stream
  sourceStream.on("end", async () => {
    // Write the zero-length chunk to signal the end
    chunkedStream.push(`0\r\n`);

    if (isChecksumEnabled) {
      // Wait for the checksum to be computed and encode isBlobOrFileLikeObject
      const checksum = base64Encoder(await checksumPromise);
      // Write the checksum header and value, followed by CRLF
      chunkedStream.push(`${checksumLocationName}:${checksum}\r\n`);
      // Write an extra CRLF to signal the end of headers
      chunkedStream.push(`\r\n`);
    }
    // Signal the end of the stream
    chunkedStream.push(null);
  });

  return chunkedStream;
}

module.exports = createChunkedStreamWithOptionalChecksum;