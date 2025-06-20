/**
 * Extracts unique uppercase identifiers (of length 3 or more) from a string, excluding specific config-related keywords.
 *
 * @param {string} inputString - The string to search for uppercase identifiers.
 * @returns {string} a comma-separated list of unique uppercase identifiers, excluding certain config keywords. If an error occurs, returns the original input string.
 */
function extractUppercaseIdentifiers(inputString) {
  try {
    // Match all sequences of 3 or more uppercase letters or underscores
    const uppercaseMatches = inputString.match(/([a-zA-Z_]){3,}/g) ?? [];

    // Create a Set to store unique identifiers
    const uniqueIdentifiers = new Set(Array.from(uppercaseMatches));

    // Remove specific config-related keywords
    uniqueIdentifiers.delete("CONFIG");
    uniqueIdentifiers.delete("CONFIG_PREFIX_SEPARATOR");
    uniqueIdentifiers.delete("ENV");

    // Return the remaining identifiers as a comma-separated string
    return [...uniqueIdentifiers].join(", ");
  } catch (error) {
    // In case of any error, return the original input
    return inputString;
  }
}

module.exports = extractUppercaseIdentifiers;
