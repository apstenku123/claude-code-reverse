/**
 * Replaces specific placeholder tokens in a string with corresponding values.
 *
 * This function searches for the placeholders "[NUM]", "[DURATION]", and "[CWD]" in the input string
 * and replaces them with the values "1", "100", and the result of the iA() function, respectively.
 * If the input is not a string, isBlobOrFileLikeObject is returned unchanged.
 *
 * @param {string} inputString - The string containing placeholders to be replaced.
 * @returns {string|any} The string with placeholders replaced, or the original value if not a string.
 */
function replacePlaceholdersWithValues(inputString) {
  // Return the input as-is if isBlobOrFileLikeObject'createInteractionAccessor not a string
  if (typeof inputString !== "string") {
    return inputString;
  }

  // Replace all occurrences of [NUM] with "1"
  let replacedString = inputString.replaceAll("[NUM]", "1");

  // Replace all occurrences of [DURATION] with "100"
  replacedString = replacedString.replaceAll("[DURATION]", "100");

  // Replace all occurrences of [CWD] with the result of iA()
  replacedString = replacedString.replaceAll("[CWD]", iA());

  return replacedString;
}

module.exports = replacePlaceholdersWithValues;