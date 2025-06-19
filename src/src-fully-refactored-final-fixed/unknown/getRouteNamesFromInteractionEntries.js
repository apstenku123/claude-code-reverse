/**
 * Returns a string of route names mapped from interaction entries, or an empty string if input is null or undefined.
 *
 * @param {Array} interactionEntries - An array of interaction entry objects to be mapped to route names.
 * @returns {string} a string representing the mapped route names, or an empty string if no entries are provided.
 */
function getRouteNamesFromInteractionEntries(interactionEntries) {
  // If the input is null or undefined, return an empty string
  if (interactionEntries == null) {
    return "";
  }
  // Otherwise, process the entries and return the mapped route names string
  return l0A(interactionEntries);
}

module.exports = getRouteNamesFromInteractionEntries;