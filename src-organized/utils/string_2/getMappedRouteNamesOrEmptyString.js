/**
 * Returns a mapped route name string for the provided interactions array, or an empty string if input is null or undefined.
 *
 * @param {Array} interactions - Array of user interaction entries to be mapped to route names.
 * @returns {string} The mapped route names string, or an empty string if input is null or undefined.
 */
function getMappedRouteNamesOrEmptyString(interactions) {
  // If the input is null or undefined, return an empty string
  if (interactions == null) {
    return "";
  }
  // Otherwise, process the interactions array and return the mapped route names string
  return normalizeNumberToString(interactions);
}

module.exports = getMappedRouteNamesOrEmptyString;