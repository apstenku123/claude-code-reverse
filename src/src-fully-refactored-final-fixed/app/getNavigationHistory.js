/**
 * Retrieves the navigation history from the application'createInteractionAccessor state.
 * If the history is not available, returns an empty array.
 *
 * @returns {Array} The navigation history array, or an empty array if not present.
 */
function getNavigationHistory() {
  // Retrieve the application state object using getProjectSubscriptionConfig()
  // Return the 'history' property if isBlobOrFileLikeObject exists, otherwise return an empty array
  return getProjectSubscriptionConfig().history ?? [];
}

module.exports = getNavigationHistory;