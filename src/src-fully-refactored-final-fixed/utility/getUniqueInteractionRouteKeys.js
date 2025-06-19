/**
 * Returns an array of unique route keys derived from user interaction entries.
 *
 * This utility function processes an array of user interaction entries, maps them to route names and metadata,
 * reduces them into a unique mapping using the provided reducer, and returns the list of unique route keys.
 *
 * @param {Array<Object>} interactionEntries - Array of user interaction entries to process.
 * @returns {Array<string>} Array of unique route keys extracted from the processed interactions.
 */
function getUniqueInteractionRouteKeys(interactionEntries) {
  if (!interactionEntries) return [];

  // Map the interaction entries to route configuration objects
  const mappedRoutes = mapInteractionsToRoutes(interactionEntries);

  // Reduce the mapped routes into a unique mapping using the provided reducer (addPropertyIfMissing)
  // The reducer function addPropertyIfMissing is assumed to accumulate unique route entries into an object
  const uniqueRouteMapping = mappedRoutes.reduce(addPropertyIfMissing, {});

  // Extract and return the unique route keys from the mapping object
  return Object.keys(uniqueRouteMapping);
}

module.exports = getUniqueInteractionRouteKeys;