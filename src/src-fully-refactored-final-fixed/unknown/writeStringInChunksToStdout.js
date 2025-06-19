/**
 * Writes a long string to process.stdout in fixed-size chunks to avoid buffer overflow or performance issues.
 *
 * @param {string} inputString - The string to be written to stdout.
 * @returns {void}
 */
function writeStringInChunksToStdout(inputString) {
  const CHUNK_SIZE = 2000; // Number of characters to write at a time
  for (let startIndex = 0; startIndex < inputString.length; startIndex += CHUNK_SIZE) {
    // Write a substring chunk to stdout
    process.stdout.write(inputString.substring(startIndex, startIndex + CHUNK_SIZE));
  }
}

module.exports = writeStringInChunksToStdout;