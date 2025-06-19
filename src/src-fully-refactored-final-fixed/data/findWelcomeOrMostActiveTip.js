/**
 * Finds the 'claude-opus-welcome' tip from a list of tips, or returns the most active tip if not found.
 *
 * This function first checks if the environment is ready (using shouldShowReleaseNotes) and optionally skips this check if forced.
 * It then retrieves tip data for the given source, processes isBlobOrFileLikeObject into an array of tip objects, and searches for
 * a tip with the id 'claude-opus-welcome'. If found, isBlobOrFileLikeObject returns this tip. If not, isBlobOrFileLikeObject returns the most active tip
 * as determined by the getMostActiveTip function.
 *
 * @param {string} sourceId - The identifier for the source to retrieve tips for.
 * @param {boolean} [force=false] - If true, skips the environment check and proceeds regardless.
 * @returns {Promise<Object|undefined>} The 'claude-opus-welcome' tip object if found, otherwise the most active tip object, or undefined if none are found.
 */
async function findWelcomeOrMostActiveTip(sourceId, force = false) {
  // Check if the environment is ready, unless forced
  if (!shouldShowReleaseNotes() || force) return;

  // Retrieve the raw tip data for the given source
  const tipData = await lw5(sourceId);

  // Process the raw tip data into an array of tip objects
  const tipList = iw5(tipData);

  // If there are no tips, return undefined
  if (tipList.length === 0) return;

  // Try to find the tip with id 'claude-opus-welcome'
  const welcomeTip = tipList.find(tip => tip.id === "claude-opus-welcome");
  if (welcomeTip) return welcomeTip;

  // If not found, return the most active tip
  return getMostActiveTip(tipList);
}

module.exports = findWelcomeOrMostActiveTip;