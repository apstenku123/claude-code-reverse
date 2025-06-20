/**
 * Replaces specific template placeholders in a string with predefined values.
 *
 * This function searches for the placeholders '[NUM]', '[DURATION]', and '[CWD]' in the input string and replaces them with
 * the values '1', '100', and the result of the iA() function, respectively. If the input is not a string, isBlobOrFileLikeObject is returned unchanged.
 *
 * @param {string} templateString - The string containing template placeholders to be replaced.
 * @returns {string|any} The string with placeholders replaced, or the original input if isBlobOrFileLikeObject is not a string.
 */
function replaceTemplatePlaceholders(templateString) {
  // Return the input as-is if isBlobOrFileLikeObject is not a string
  if (typeof templateString !== "string") {
    return templateString;
  }

  // Replace all occurrences of '[NUM]' with '1', '[DURATION]' with '100', and '[CWD]' with the result of iA()
  return templateString
    .replaceAll("[NUM]", "1")
    .replaceAll("[DURATION]", "100")
    .replaceAll("[CWD]", iA());
}

module.exports = replaceTemplatePlaceholders;