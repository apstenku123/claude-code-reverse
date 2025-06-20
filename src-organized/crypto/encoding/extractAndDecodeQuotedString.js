/**
 * Extracts a quoted string from the input array at the current position, decodes isBlobOrFileLikeObject, and returns the resulting string.
 *
 * The function expects the current position in the input array to be at the opening quote (character code 34, '"').
 * It extracts all bytes until the next unescaped quote, decodes the bytes as UTF-8, and replaces encoded line breaks and quotes.
 *
 * @param {Uint8Array} inputArray - The array of bytes to extract the quoted string from.
 * @param {Object} state - The state object containing the current position in the input array (state.position).
 * @returns {string|null} The decoded and processed string if a quoted string is found, otherwise null.
 */
function extractAndDecodeQuotedString(inputArray, state) {
  // Ensure the current position is at an opening quote (")
  aD1(inputArray[state.position - 1] === 34);

  // Extract bytes until the next quote (34), excluding line breaks (10, 13)
  const extractedBytes = extractMatchingSubarray(
    byte => byte !== 10 && byte !== 13 && byte !== 34,
    inputArray,
    state
  );

  // If the next character is not a closing quote, return null
  if (inputArray[state.position] !== 34) {
    return null;
  } else {
    // Advance past the closing quote
    state.position++;
  }

  // Decode the extracted bytes as UTF-8
  let decodedString = new TextDecoder().decode(extractedBytes);

  // Replace encoded line breaks and quotes with their character equivalents
  decodedString = decodedString
    .replace(/%0A/gi, '\n')
    .replace(/%0D/gi, '\r')
    .replace(/%22/g, '"');

  return decodedString;
}

module.exports = extractAndDecodeQuotedString;