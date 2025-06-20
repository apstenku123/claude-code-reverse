/**
 * Determines the position of the first padding character ('=') in a Base64-encoded string
 * and calculates the required padding to make its length a multiple of 4.
 *
 * @param {string} base64String - The Base64-encoded string to analyze.
 * @returns {[number, number]} An array where the first element is the index of the first '=' character (or the string length if none),
 * and the second element is the number of padding characters needed to make the length a multiple of 4.
 * @throws {Error} If the input string'createInteractionAccessor length is not a multiple of 4.
 */
function getBase64PaddingInfo(base64String) {
  const stringLength = base64String.length;

  // Base64 strings must have a length that is a multiple of 4
  if (stringLength % 4 > 0) {
    throw new Error("Invalid string. Length must be a multiple of 4");
  }

  // Find the index of the first padding character ('=')
  let firstPaddingIndex = base64String.indexOf("=");
  if (firstPaddingIndex === -1) {
    firstPaddingIndex = stringLength;
  }

  // Calculate the number of padding characters needed
  // If there is no padding, this will be 0
  const requiredPadding = firstPaddingIndex === stringLength ? 0 : 4 - (firstPaddingIndex % 4);

  return [firstPaddingIndex, requiredPadding];
}

module.exports = getBase64PaddingInfo;
