/**
 * Converts an array of character codes (numbers) into a string.
 * Handles large arrays by processing them in chunks to avoid stack overflow errors.
 *
 * @param {number[]} charCodeArray - Array of character codes to convert to a string.
 * @returns {string} The resulting string constructed from the character codes.
 */
function convertCharCodeArrayToString(charCodeArray) {
  const CHUNK_SIZE = 16384; // Maximum number of arguments for fromCharCode.apply
  // If the array is small enough, convert all at once
  if (charCodeArray.length < CHUNK_SIZE) {
    return String.fromCharCode.apply(String, charCodeArray);
  }
  // For large arrays, process in chunks to avoid stack overflow
  let resultString = "";
  for (let startIndex = 0; startIndex < charCodeArray.length; startIndex += CHUNK_SIZE) {
    const chunk = charCodeArray.slice(startIndex, startIndex + CHUNK_SIZE);
    resultString += String.fromCharCode.apply(String, chunk);
  }
  return resultString;
}

module.exports = convertCharCodeArrayToString;