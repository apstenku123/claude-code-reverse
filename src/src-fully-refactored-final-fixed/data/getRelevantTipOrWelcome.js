/**
 * Retrieves the most relevant tip object for the user, prioritizing the 'claude-opus-welcome' tip if present.
 *
 * This function first checks if the system is in a valid state to proceed (using shouldShowReleaseNotes), unless overridden by forceRun.
 * It then asynchronously filters the provided tips to only those that are relevant (using filterRelevantTips),
 * further filters them based on cooldown sessions (using filterByCooldownSessions), and finally returns either
 * the 'claude-opus-welcome' tip if present, or the tip with the most sessions (using getTipWithMostSessions).
 *
 * @param {Array<Object>} tips - An array of tip objects to evaluate.
 * @param {boolean} [forceRun=false] - If true, bypasses the shouldShowReleaseNotes system state check and forces execution.
 * @returns {Promise<Object|undefined>} The most relevant tip object, or undefined if none found.
 */
async function getRelevantTipOrWelcome(tips, forceRun = false) {
  // Check if the system is in a valid state to proceed, unless forced
  if (!shouldShowReleaseNotes() || forceRun) return;

  // Asynchronously filter tips to only those that are relevant
  const relevantTips = await filterRelevantTips(tips);

  // Further filter relevant tips based on cooldown session requirements
  const tipsWithValidCooldown = filterByCooldownSessions(relevantTips);

  // If no tips remain after filtering, return undefined
  if (tipsWithValidCooldown.length === 0) return;

  // Look for the special 'claude-opus-welcome' tip
  const welcomeTip = tipsWithValidCooldown.find(tip => tip.id === "claude-opus-welcome");
  if (welcomeTip) return welcomeTip;

  // Otherwise, return the tip with the most sessions
  return getTipWithMostSessions(tipsWithValidCooldown);
}

module.exports = getRelevantTipOrWelcome;