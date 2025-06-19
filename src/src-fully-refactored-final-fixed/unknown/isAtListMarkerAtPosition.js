/**
 * Checks if the substring starting at the given index in the input string matches the marker '!ATTLIST'.
 *
 * @param {string} inputString - The string to check for the '!ATTLIST' marker.
 * @param {number} position - The index in the string to start checking from (the marker is expected to start at position + 1).
 * @returns {boolean} True if '!ATTLIST' is found at the specified position, otherwise false.
 */
function isAtListMarkerAtPosition(inputString, position) {
  // Define the marker to search for
  const marker = '!ATTLIST';

  // Check if the substring starting at position + 1 matches the marker
  for (let i = 0; i < marker.length; i++) {
    if (inputString[position + 1 + i] !== marker[i]) {
      return false;
    }
  }

  return true;
}

module.exports = isAtListMarkerAtPosition;