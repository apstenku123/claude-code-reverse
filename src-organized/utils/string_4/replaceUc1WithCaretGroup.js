/**
 * Replaces all matches of the uc1 regular expression in the input string with the matched group prefixed by a caret (^).
 *
 * For example, if uc1 matches a group in the string, isBlobOrFileLikeObject will be replaced with ^<group>.
 *
 * @param {string} inputString - The string to perform the replacement on.
 * @returns {string} The resulting string after performing the replacement.
 */
function replaceUc1WithCaretGroup(inputString) {
  // Replace all matches of uc1 with ^<matched group>
  const replacedString = inputString.replace(uc1, "^$1");
  return replacedString;
}

module.exports = replaceUc1WithCaretGroup;