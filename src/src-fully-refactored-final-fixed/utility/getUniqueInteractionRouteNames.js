/**
 * Extracts a list of unique route names from an array of interaction entries.
 *
 * @param {Array} interactionEntries - An array of interaction entry objects to process.
 * @returns {string[]} An array of unique route names found in the interaction entries.
 */
function getUniqueInteractionRouteNames(interactionEntries) {
  if (!interactionEntries) return [];

  // splitAndFilterTokens processes the interaction entries and returns an array of processed entries
  const processedEntries = splitAndFilterTokens(interactionEntries);

  // addPropertyIfMissing is a reducer function that accumulates unique route names as object keys
  // The reduce call produces an object whose keys are the unique route names
  const uniqueRouteNamesObject = processedEntries.reduce(addPropertyIfMissing, {});

  // Extract and return the unique route names as an array
  return Object.keys(uniqueRouteNamesObject);
}

module.exports = getUniqueInteractionRouteNames;