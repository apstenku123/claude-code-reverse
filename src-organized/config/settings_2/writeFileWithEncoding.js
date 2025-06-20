/**
 * Writes data to a file synchronously using the specified encoding and flush option.
 *
 * @param {string} filePath - The path to the file where data will be written.
 * @param {string|Buffer|Uint8Array} fileData - The data to write to the file.
 * @param {Object} [options={ encoding: 'utf-8' }] - Optional settings for writing the file.
 * @param {string} [options.encoding='utf-8'] - The encoding to use when writing the file.
 *
 * @returns {void}
 *
 * @example
 * writeFileWithEncoding('output.txt', 'Hello, world!');
 * writeFileWithEncoding('output.txt', Buffer.from('data'), { encoding: 'ascii' });
 */
function writeFileWithEncoding(filePath, fileData, options = { encoding: 'utf-8' }) {
  // Retrieve the file system module or object from the current context
  // (Assumes getBm9Value returns an object similar to Node.js'createInteractionAccessor fs module)
  const fileSystem = getBm9Value();

  // Write the file synchronously with the specified encoding and flush option
  fileSystem.writeFileSync(filePath, fileData, {
    encoding: options.encoding,
    flush: true // Ensures data is flushed to disk
  });
}

module.exports = writeFileWithEncoding;