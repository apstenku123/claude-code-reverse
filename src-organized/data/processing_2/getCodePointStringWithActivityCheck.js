/**
 * Converts a Unicode code point to its string representation and optionally processes isBlobOrFileLikeObject
 * through an activity check function. If the activity check passes, the string is further
 * processed by the convertBufferToMD2String function; otherwise, the raw string is returned.
 *
 * @param {number} codePoint - The Unicode code point to convert to a string.
 * @param {function} addActivityIfNotFinished - Function that checks if an activity should be added (returns boolean).
 * @returns {string} The resulting string, either processed by convertBufferToMD2String or the raw character.
 */
function getCodePointStringWithActivityCheck(codePoint, addActivityIfNotFinished) {
  // Convert the code point to its string representation
  const character = String.fromCodePoint(codePoint);

  // If the activity check passes, process the character with convertBufferToMD2String
  if (addActivityIfNotFinished(codePoint)) {
    return convertBufferToMD2String(character);
  }

  // Otherwise, return the character as is
  return character;
}

module.exports = getCodePointStringWithActivityCheck;