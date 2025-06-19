/**
 * Finds and returns the most active relevant tip from a given source, unless certain conditions are met.
 *
 * This function first checks if the environment is ready (via shouldShowReleaseNotes) and if the override flag is not set.
 * It then asynchronously filters the tips to only those that are relevant, applies a cooldown session filter,
 * and finally returns either the special 'claude-opus-welcome' tip if present, or the most active tip.
 *
 * @async
 * @param {Array<Object>} tipList - The array of tip objects to filter and evaluate.
 * @param {boolean} [override=false] - If true, bypasses the environment check and returns early.
 * @returns {Promise<Object|undefined>} The most active relevant tip object, the special welcome tip if present, or undefined if none found.
 */
async function findMostActiveRelevantTip(tipList, override = false) {
  // If the environment is not ready or override is true, exit early
  if (!shouldShowReleaseNotes() || override) return;

  // Asynchronously filter tips to only those that are relevant
  const relevantTips = await lw5(tipList);

  // Further filter relevant tips by cooldown session requirements
  const tipsWithValidCooldown = iw5(relevantTips);

  // If no tips remain after filtering, return undefined
  if (tipsWithValidCooldown.length === 0) return;

  // Check for the special 'claude-opus-welcome' tip
  const welcomeTip = tipsWithValidCooldown.find(
    tip => tip.id === "claude-opus-welcome"
  );
  if (welcomeTip) return welcomeTip;

  // Otherwise, return the most active tip based on session count
  return getMostActiveTip(tipsWithValidCooldown);
}

module.exports = findMostActiveRelevantTip;