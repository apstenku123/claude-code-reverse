/**
 * Searches for an interaction entry in the provided array that matches the URL of a valid IDE subscription.
 *
 * @async
 * @function findMatchingInteractionByIdeUrl
 * @param {Array<Object>} interactionEntries - Array of interaction entry objects, each expected to have a 'url' property.
 * @param {Object} config - Configuration object, expected to have an 'ide' property describing the IDE subscription.
 * @returns {Promise<Object|null>} The matching interaction entry if found, otherwise null.
 */
async function findMatchingInteractionByIdeUrl(interactionEntries, config) {
  // Extract the IDE subscription from the config object, if present
  const subscription = config?.ide;

  // Validate that the subscription exists and is of a supported type
  if (!subscription || (subscription.type !== "sse-ide" && subscription.type !== "ws-ide")) {
    return null;
  }

  // Search for an interaction entry with a matching URL
  for (const interactionEntry of interactionEntries) {
    if (interactionEntry.url === subscription.url) {
      return interactionEntry;
    }
  }

  // No matching interaction entry found
  return null;
}

module.exports = findMatchingInteractionByIdeUrl;
