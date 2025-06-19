/**
 * Checks if the substring starting at a specific index in the given string matches the marker "!ATTLIST".
 *
 * @param {string} inputString - The string to check for the marker.
 * @param {number} startIndex - The index in the string to start checking for the marker.
 * @returns {boolean} Returns true if the substring at the specified index matches "!ATTLIST", otherwise false.
 */
function isAttListMarkerAtIndex(inputString, startIndex) {
  // Check if the substring starting at startIndex + 1 matches "!ATTLIST"
  const marker = "!ATTLIST";
  for (let i = 0; i < marker.length; i++) {
    if (inputString[startIndex + 1 + i] !== marker[i]) {
      return false;
    }
  }
  return true;
}

module.exports = isAttListMarkerAtIndex;