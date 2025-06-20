/**
 * Finds the index of the end of a numeric or hexadecimal character entity in a string.
 *
 * This function scans a string starting from a given index, looking for a character entity
 * (e.g., '&#123;' or '&#x1A3;'). It determines whether the entity is decimal or hexadecimal
 * based on the presence of 'x' after the starting index, and returns the index of the
 * semicolon (;) that ends the entity. If the sequence is invalid or the semicolon is not found,
 * the function returns -1.
 *
 * @param {string} inputString - The string to scan for a character entity.
 * @param {number} startIndex - The index in the string to start scanning from.
 * @returns {number} The index of the semicolon ending the entity, or -1 if not found or invalid.
 */
function findNumericOrHexEntityEndIndex(inputString, startIndex) {
  // Default to matching decimal digits
  let digitPattern = /\d/;
  let currentIndex = startIndex;

  // Check if the entity is hexadecimal (e.g., '&#x1A3;')
  if (inputString[currentIndex] === "x") {
    currentIndex++;
    digitPattern = /[\da-fA-F]/; // Update pattern to match hexadecimal digits
  }

  // Iterate through the string, looking for the semicolon or invalid characters
  for (; currentIndex < inputString.length; currentIndex++) {
    if (inputString[currentIndex] === ";") {
      return currentIndex; // Found the end of the entity
    }
    if (!inputString[currentIndex].match(digitPattern)) {
      break; // Invalid character for the entity type
    }
  }

  // Return -1 if no valid entity end was found
  return -1;
}

module.exports = findNumericOrHexEntityEndIndex;