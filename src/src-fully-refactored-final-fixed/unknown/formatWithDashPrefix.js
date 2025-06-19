/**
 * Prefixes the given string with a dash and a space.
 *
 * @param {string} inputText - The text to be prefixed.
 * @returns {string} The input text prefixed with '- '.
 */
const formatWithDashPrefix = (inputText) => {
  // Prefix the input text with '- ' and return
  return `- ${inputText}`;
};

module.exports = formatWithDashPrefix;
