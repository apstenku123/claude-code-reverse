/**
 * Writes a long string to process.stdout in manageable chunks to avoid buffer overflow.
 *
 * This function splits the input string into chunks of 2000 characters and writes each chunk
 * sequentially to the standard output stream. This approach is useful for handling very large strings
 * that may exceed the buffer size if written all at once.
 *
 * @param {string} inputString - The string to be written to standard output in chunks.
 * @returns {void} This function does not return a value.
 */
function writeStringInChunks(inputString) {
  const CHUNK_SIZE = 2000;
  // Iterate over the input string in increments of CHUNK_SIZE
  for (let startIndex = 0; startIndex < inputString.length; startIndex += CHUNK_SIZE) {
    // Extract a substring of up to CHUNK_SIZE characters
    const chunk = inputString.substring(startIndex, startIndex + CHUNK_SIZE);
    process.stdout.write(chunk);
  }
}

module.exports = writeStringInChunks;