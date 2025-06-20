/**
 * Returns a string of route names mapped from an array of interaction entries.
 * If the input is null or undefined, returns an empty string.
 *
 * @param {Array} interactionEntries - Array of interaction entry objects to process.
 * @returns {string} a string representing the mapped route names, or an empty string if input is null/undefined.
 */
function getRouteNamesFromInteractionEntries(interactionEntries) {
  // If the input is null or undefined, return an empty string
  if (interactionEntries == null) {
    return "";
  }
  // Otherwise, process the interaction entries to get route names
  return normalizeNumberToString(interactionEntries);
}

module.exports = getRouteNamesFromInteractionEntries;