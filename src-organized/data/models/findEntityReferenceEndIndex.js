/**
 * Finds the index of the end of an HTML/XML entity reference in a string, starting from a given index.
 * Supports both decimal (e.g., &#123;) and hexadecimal (e.g., &#x1A;) numeric character references.
 *
 * @param {string} inputString - The string to search for an entity reference.
 * @param {number} startIndex - The index in the string to start searching from.
 * @returns {number} The index of the semicolon (;) that ends the entity reference, or -1 if not found.
 */
function findEntityReferenceEndIndex(inputString, startIndex) {
  // Default pattern: matches a decimal digit
  let validCharPattern = /\d/;

  // If the entity is hexadecimal (e.g., '&#x'), update the pattern
  if (inputString[startIndex] === "x") {
    startIndex++;
    validCharPattern = /[\da-fA-F]/;
  }

  // Iterate through the string to find the end of the entity reference
  for (; startIndex < inputString.length; startIndex++) {
    if (inputString[startIndex] === ";") {
      // Found the end of the entity reference
      return startIndex;
    }
    if (!inputString[startIndex].match(validCharPattern)) {
      // Invalid character for the entity reference
      break;
    }
  }

  // No valid entity reference end found
  return -1;
}

module.exports = findEntityReferenceEndIndex;