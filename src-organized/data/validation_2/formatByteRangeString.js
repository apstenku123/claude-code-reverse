/**
 * Formats a byte range string in the format: 'bytes <start>-<end>/<total>'.
 * Utilizes the validateAndReturnInput function to format each numeric value.
 *
 * @param {number|string} startByte - The starting byte position.
 * @param {number|string} endByte - The ending byte position.
 * @param {number|string} totalBytes - The total number of bytes.
 * @returns {string} The formatted byte range string.
 */
function formatByteRangeString(startByte, endByte, totalBytes) {
  // Start with the 'bytes ' prefix
  let byteRangeString = "bytes ";

  // Append the formatted start byte
  byteRangeString += validateAndReturnInput(`${startByte}`);

  // Append the dash separator
  byteRangeString += "-";

  // Append the formatted end byte
  byteRangeString += validateAndReturnInput(`${endByte}`);

  // Append the slash separator
  byteRangeString += "/";

  // Append the formatted total bytes
  byteRangeString += validateAndReturnInput(`${totalBytes}`);

  // Return the fully constructed byte range string
  return byteRangeString;
}

module.exports = formatByteRangeString;