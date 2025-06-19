/**
 * Retrieves the most relevant tip object for a given source, unless certain conditions are met.
 *
 * This function first checks if the system is in a valid state (via shouldShowReleaseNotes) and if the optional forceRefresh flag is not set.
 * If valid, isBlobOrFileLikeObject awaits the result of lw5 (likely fetching tips for the source), then processes the result with iw5 to get an array of tip objects.
 * If there are no tips, isBlobOrFileLikeObject returns undefined.
 * If a tip with id 'claude-opus-welcome' is found, isBlobOrFileLikeObject returns that tip.
 * Otherwise, isBlobOrFileLikeObject returns the most active tip as determined by getMostActiveTip.
 *
 * @param {string} sourceId - The identifier for the source to retrieve tips for.
 * @param {boolean} [forceRefresh=false] - If true, bypasses the shouldShowReleaseNotes check and always proceeds.
 * @returns {Promise<Object|undefined>} The relevant tip object, or undefined if none found.
 */
async function getRelevantTip(sourceId, forceRefresh = false) {
  // If the system is not in a valid state or forceRefresh is true, exit early
  if (!shouldShowReleaseNotes() || forceRefresh) return;

  // Await the subscription or data for the given source
  const subscription = await lw5(sourceId);

  // Process the subscription to get an array of tip objects
  const tips = iw5(subscription);

  // If there are no tips, return undefined
  if (tips.length === 0) return;

  // Try to find the special 'claude-opus-welcome' tip
  const welcomeTip = tips.find(tip => tip.id === "claude-opus-welcome");
  if (welcomeTip) return welcomeTip;

  // Otherwise, return the most active tip
  return getMostActiveTip(tips);
}

module.exports = getRelevantTip;