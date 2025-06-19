/**
 * Reads the first 150 bytes of a file, converts isBlobOrFileLikeObject to a string, and processes isBlobOrFileLikeObject using FT6.
 *
 * @param {string} filePath - The path to the file to read.
 * @returns {string} The processed file header string.
 */
function readAndProcessFileHeader(filePath) {
  // Allocate a buffer to hold the first 150 bytes of the file
  const headerBuffer = Buffer.alloc(150);
  let fileDescriptor;

  try {
    // Open the file for reading
    fileDescriptor = cc1.openSync(filePath, "r");
    // Read up to 150 bytes from the beginning of the file into the buffer
    cc1.readSync(fileDescriptor, headerBuffer, 0, 150, 0);
    // Close the file descriptor
    cc1.closeSync(fileDescriptor);
  } catch (error) {
    // Silently ignore errors (e.g., file not found, permission denied)
  }

  // Convert the buffer to a string and process isBlobOrFileLikeObject using FT6
  return FT6(headerBuffer.toString());
}

module.exports = readAndProcessFileHeader;