/**
 * Writes data to a file synchronously with specified encoding and flush option.
 *
 * @param {string} filePath - The path to the file where data will be written.
 * @param {string|Buffer|Uint8Array} fileData - The data to write to the file.
 * @param {Object} [options={ encoding: 'utf-8' }] - Optional settings for writing the file.
 * @param {string} [options.encoding='utf-8'] - The encoding to use when writing the file.
 *
 * @returns {void}
 *
 * @example
 * writeFileWithFlush('output.txt', 'Hello, world!');
 */
function writeFileWithFlush(filePath, fileData, options = { encoding: 'utf-8' }) {
  // Get the file system module or object from external accessor
  const fileSystem = getBm9Value();

  // Write the data to the file synchronously with encoding and flush options
  fileSystem.writeFileSync(filePath, fileData, {
    encoding: options.encoding,
    flush: true // Ensure data is flushed to disk
  });
}

module.exports = writeFileWithFlush;