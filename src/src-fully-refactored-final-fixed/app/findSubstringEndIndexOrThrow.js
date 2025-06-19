/**
 * Finds the end index of the first occurrence of a substring within a string, starting from a given position.
 * Throws an error with a custom message if the substring is not found.
 *
 * @param {string} sourceString - The string to search within.
 * @param {string} searchString - The substring to search for.
 * @param {number} startPosition - The position in sourceString to start the search from.
 * @param {string} errorMessage - The error message to throw if searchString is not found.
 * @returns {number} The index of the last character of the first occurrence of searchString in sourceString, starting from startPosition.
 * @throws {Error} Throws an error with errorMessage if searchString is not found in sourceString.
 */
function findSubstringEndIndexOrThrow(sourceString, searchString, startPosition, errorMessage) {
  // Find the index of the first occurrence of searchString in sourceString, starting from startPosition
  const foundIndex = sourceString.indexOf(searchString, startPosition);

  // If the substring is not found, throw an error with the provided message
  if (foundIndex === -1) {
    throw new Error(errorMessage);
  }

  // Return the index of the last character of the found substring
  return foundIndex + searchString.length - 1;
}

module.exports = findSubstringEndIndexOrThrow;