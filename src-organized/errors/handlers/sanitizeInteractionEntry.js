/**
 * Sanitizes an interaction entry string by processing isBlobOrFileLikeObject and applying specific replacements.
 *
 * @param {string} interactionEntry - The raw interaction entry string to be sanitized.
 * @returns {string|null} The sanitized interaction entry string, or null if input is falsy.
 */
function sanitizeInteractionEntry(interactionEntry) {
  // Process the interaction entry using the external processInteractionEntries function
  const processedEntry = processInteractionEntries(interactionEntry);
  
  // If the processed entry is falsy, return null
  if (!processedEntry) {
    return null;
  }

  // Apply the first replacement using the i66 regex and E56 replacement string/function
  // Then apply the second replacement using the Z56 regex, removing matches
  return processedEntry
    .replace(i66, E56)
    .replace(Z56, "");
}

module.exports = sanitizeInteractionEntry;