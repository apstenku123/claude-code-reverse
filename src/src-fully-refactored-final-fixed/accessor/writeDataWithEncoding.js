/**
 * Writes data to a target using the specified encoding, optionally converting line endings to CRLF.
 *
 * @param {string} target - The target to which data will be written.
 * @param {string} data - The data to write. If lineEndingType is 'CRLF', line endings will be converted.
 * @param {string} encoding - The encoding to use when writing the data.
 * @param {string} lineEndingType - The type of line ending to use. If 'CRLF', converts '\n' to '\r\n'.
 * @returns {void}
 */
function writeDataWithEncoding(target, data, encoding, lineEndingType) {
  let processedData = data;

  // If lineEndingType is 'CRLF', replace all line breaks with CRLF
  if (lineEndingType === "CRLF") {
    processedData = data.split(`\n`).join(`\r\n`);
  }

  // Write the processed data to the target with the specified encoding
  jM(target, processedData, {
    encoding: encoding
  });
}

module.exports = writeDataWithEncoding;