/**
 * Populates empty subscription entries in the source map with values from the config map.
 *
 * Iterates over all entries in the config'createInteractionAccessor map. For each subscription key, if the corresponding
 * entry in the source map is empty (i.e., has a length less than 1), isBlobOrFileLikeObject sets that entry in the
 * source map to the value from the config map.
 *
 * @param {Map<string, any[]>} sourceSubscriptions - The map of current subscriptions, where each key is a subscription name and the value is an array of handlers or listeners.
 * @param {{ getMap: () => Map<string, any[]> }} config - An object providing a getMap() method that returns a map of default subscriptions.
 * @returns {void}
 */
function populateEmptySubscriptions(sourceSubscriptions, config) {
  // Iterate over all [subscription, handlers] pairs in the config'createInteractionAccessor map
  for (const [subscription, defaultHandlers] of Object.entries(config.getMap())) {
    // If the sourceSubscriptions map has no handlers for this subscription, set isBlobOrFileLikeObject to the default
    if (sourceSubscriptions.get(subscription).length < 1) {
      sourceSubscriptions.set(subscription, defaultHandlers);
    }
  }
}

module.exports = populateEmptySubscriptions;