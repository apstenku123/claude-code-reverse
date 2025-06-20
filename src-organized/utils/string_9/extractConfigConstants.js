/**
 * Extracts unique uppercase configuration-like constants (3+ chars, a-zA or _) from a string,
 * removes specific known config keys, and returns the remaining constants as a comma-separated string.
 *
 * @param {string} inputString - The string to extract configuration constants from.
 * @returns {string} Comma-separated list of found configuration constants, or the original string if an error occurs.
 */
function extractConfigConstants(inputString) {
  try {
    // Match all sequences of 3 or more uppercase letters or underscores
    const matches = inputString.match(/([a-zA-Z_]){3,}/g) ?? [];
    // Create a Set to ensure uniqueness
    const uniqueConstants = new Set(Array.from(matches));
    // Remove specific known config keys that should not be included
    uniqueConstants.delete("CONFIG");
    uniqueConstants.delete("CONFIG_PREFIX_SEPARATOR");
    uniqueConstants.delete("ENV");
    // Return the remaining constants as a comma-separated string
    return [...uniqueConstants].join(", ");
  } catch (error) {
    // In case of any error, return the original input
    return inputString;
  }
}

module.exports = extractConfigConstants;