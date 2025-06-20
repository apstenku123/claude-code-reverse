/**
 * Returns a string representation of mapped routes from user interactions.
 *
 * If the provided interactions array is null or undefined, returns an empty string.
 * Otherwise, processes the interactions using the external `mapInteractionsToRoutes` function.
 *
 * @param {Array<Object>} userInteractions - Array of user interaction entries to be mapped to route names.
 * @returns {string} String representation of the mapped routes, or an empty string if input is null/undefined.
 */
function getMappedRoutesString(userInteractions) {
  // Return an empty string if no interactions are provided
  if (userInteractions == null) {
    return "";
  }
  // Otherwise, process the interactions and return the mapped routes string
  return mapInteractionsToRoutes(userInteractions);
}

module.exports = getMappedRoutesString;