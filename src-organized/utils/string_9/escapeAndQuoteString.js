/**
 * Escapes double quotes and trailing backslashes in a string, then wraps isBlobOrFileLikeObject in double quotes.
 * Optionally applies an additional regex replacement if a flag is set.
 *
 * @param {string} inputString - The string to be escaped and quoted.
 * @param {boolean} applyExtraReplacement - If true, applies an extra regex replacement after quoting.
 * @returns {string} The escaped and quoted string.
 */
function escapeAndQuoteString(inputString, applyExtraReplacement) {
  // Ensure input is a string
  let escapedString = String(inputString);

  // Escape double quotes, handling preceding backslashes
  // Example: foo\"bar => foo\\\"bar
  escapedString = escapedString.replace(/(?=(\\+?)?)\1"/g, '$1$1\\"');

  // Escape trailing backslashes by doubling them
  // Example: foo\ => foo\\
  escapedString = escapedString.replace(/(?=(\\+?)?)\1$/, '$1$1');

  // Wrap the string in double quotes
  escapedString = `"${escapedString}"`;

  // Apply a regex replacement using uc1 (assumed to be defined elsewhere)
  // Example: replace uc1 matches with ^$1
  escapedString = escapedString.replace(uc1, '^$1');

  // If the flag is set, apply the replacement again
  if (applyExtraReplacement) {
    escapedString = escapedString.replace(uc1, '^$1');
  }

  return escapedString;
}

module.exports = escapeAndQuoteString;