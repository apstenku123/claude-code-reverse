/**
 * Finds and returns the most relevant tip object from a given source, with special handling for a specific welcome tip.
 *
 * This function first checks if the environment is ready (via shouldShowReleaseNotes) and if not overridden by forceSearch. It then retrieves
 * a subscription object using lw5, extracts the list of tips using iw5, and searches for a tip with the id 'claude-opus-welcome'.
 * If found, isBlobOrFileLikeObject returns this welcome tip. Otherwise, isBlobOrFileLikeObject returns the most active tip as determined by getMostActiveTip.
 *
 * @param {string} sourceObservable - The identifier or source from which to retrieve tips.
 * @param {boolean} [forceSearch=false] - If true, bypasses the shouldShowReleaseNotes environment check and forces the search.
 * @returns {Promise<Object|undefined>} The tip object with id 'claude-opus-welcome' if found, otherwise the most active tip, or undefined if no tips are found.
 */
async function findMostRelevantTip(sourceObservable, forceSearch = false) {
  // Check if the environment is ready, unless forceSearch is true
  if (!shouldShowReleaseNotes() || forceSearch) {
    return;
  }

  // Retrieve the subscription or data object based on the source
  const subscription = await lw5(sourceObservable);

  // Extract the list of tip objects from the subscription
  const tips = iw5(subscription);

  // If there are no tips, return undefined
  if (tips.length === 0) {
    return;
  }

  // Attempt to find the special welcome tip by its unique id
  const welcomeTip = tips.find(tip => tip.id === "claude-opus-welcome");
  if (welcomeTip) {
    return welcomeTip;
  }

  // If the welcome tip is not found, return the most active tip
  return getMostActiveTip(tips);
}

module.exports = findMostRelevantTip;