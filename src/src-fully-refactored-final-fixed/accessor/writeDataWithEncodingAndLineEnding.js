/**
 * Writes data to a destination with specified encoding and optional line ending conversion.
 *
 * If the lineEndingType is 'CRLF', all line breaks in the data will be converted to CRLF (\r\n).
 *
 * @param {string} destination - The target destination or identifier for the write operation.
 * @param {string} data - The data to be written.
 * @param {string} encoding - The encoding to use when writing the data (e.g., 'utf8').
 * @param {string} [lineEndingType] - Optional. If set to 'CRLF', converts line endings to CRLF.
 * @returns {void}
 */
function writeDataWithEncodingAndLineEnding(destination, data, encoding, lineEndingType) {
  let processedData = data;

  // If lineEndingType is 'CRLF', replace all line breaks with CRLF
  if (lineEndingType === "CRLF") {
    processedData = data.split(`\n`).join(`\r\n`);
  }

  // Call the external function to perform the write operation
  jM(destination, processedData, {
    encoding: encoding
  });
}

module.exports = writeDataWithEncodingAndLineEnding;