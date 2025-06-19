/**
 * Extracts and normalizes a substring from the input string, removing leading/trailing slashes and whitespace, and converting to lowercase.
 * The substring is determined by the first space character in the input, or the entire string if no space is found.
 *
 * @param {string} inputString - The string to extract and normalize the substring from.
 * @returns {string} The normalized substring, with leading/trailing slashes and whitespace removed, and converted to lowercase.
 */
function extractNormalizedSubstring(inputString) {
  // Find the index of the first space character in the input string
  const spaceIndex = xR.spaceIndex(inputString);
  let substring;

  if (spaceIndex === -1) {
    // If no space is found, extract everything except the first and last character
    substring = inputString.slice(1, -1);
  } else {
    // If a space is found, extract from the second character up to and including the space
    substring = inputString.slice(1, spaceIndex + 1);
  }

  // Trim whitespace and convert to lowercase
  substring = xR.trim(substring).toLowerCase();

  // Remove leading slash if present
  if (substring.slice(0, 1) === "/") {
    substring = substring.slice(1);
  }

  // Remove trailing slash if present
  if (substring.slice(-1) === "/") {
    substring = substring.slice(0, -1);
  }

  return substring;
}

module.exports = extractNormalizedSubstring;