/**
 * Retrieves the most active tip or the special 'claude-opus-welcome' tip from a list of relevant tips.
 *
 * This function first checks if the environment is ready (via shouldShowReleaseNotes) and if not forced by the skipCheck flag, returns early.
 * It then asynchronously filters the provided tips to only those that are relevant, applies a cooldown filter,
 * and attempts to find a tip with the id 'claude-opus-welcome'. If found, isBlobOrFileLikeObject returns this tip. Otherwise,
 * isBlobOrFileLikeObject returns the most active tip from the filtered list.
 *
 * @param {Array<Object>} tips - Array of tip objects to process.
 * @param {boolean} [skipCheck=false] - If true, skips the environment check and proceeds regardless.
 * @returns {Promise<Object|undefined>} The 'claude-opus-welcome' tip if present, otherwise the most active tip, or undefined if none found.
 */
async function getActiveTipOrWelcomeTip(tips, skipCheck = false) {
  // Check if environment is ready or if handleMissingDoctypeError should skip the check
  if (!shouldShowReleaseNotes() || skipCheck) {
    return;
  }

  // Filter tips to only those that are relevant
  const relevantTips = await lw5(tips);

  // Further filter tips by cooldown sessions
  const filteredTips = iw5(relevantTips);

  // If no tips remain after filtering, return undefined
  if (filteredTips.length === 0) {
    return;
  }

  // Attempt to find the special 'claude-opus-welcome' tip
  const welcomeTip = filteredTips.find(tip => tip.id === "claude-opus-welcome");
  if (welcomeTip) {
    return welcomeTip;
  }

  // Return the most active tip from the filtered list
  return getMostActiveTip(filteredTips);
}

module.exports = getActiveTipOrWelcomeTip;