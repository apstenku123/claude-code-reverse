/**
 * Checks if the provided value is a string that matches the interaction entry pattern.
 *
 * @param {string} interactionEntry - The value to validate as an interaction entry string.
 * @returns {boolean} True if the value is a string and matches the interaction entry regex; otherwise, false.
 */
function isValidInteractionEntryString(interactionEntry) {
  // Ensure the value is a string and matches the required pattern
  return typeof interactionEntry === "string" && Si6.default.test(interactionEntry);
}

module.exports = isValidInteractionEntryString;