/**
 * Extracts a substring from the input string after slicing off a prefix, validates that the prefix matches a given character code array,
 * and returns the substring up to and including the first delimiter character (\x07) found after a specified offset.
 *
 * @param {string} inputString - The string to process.
 * @param {number} sliceOffset - The number of characters to remove from the start of the input string.
 * @returns {string|undefined} The extracted substring up to and including the delimiter, or undefined if validation fails or delimiter is not found.
 */
function extractPrefixedStringWithDelimiter(inputString, sliceOffset) {
  // Remove the specified number of characters from the start of the input string
  const slicedString = inputString.slice(sliceOffset);

  // Validate that each character code in the sliced string matches the corresponding value in Tx1 (starting from index 1)
  for (let index = 1; index < Tx1.length; index++) {
    if (slicedString.charCodeAt(index) !== Tx1[index]) {
      return;
    }
  }

  // Find the position of the delimiter character '\x07' after RI1.length
  const delimiterPosition = slicedString.indexOf("\x07", RI1.length);
  if (delimiterPosition === -1) {
    return;
  }

  // Return the substring up to and including the delimiter
  return slicedString.slice(0, delimiterPosition + 1);
}

module.exports = extractPrefixedStringWithDelimiter;