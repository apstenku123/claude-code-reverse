/**
 * Returns the tip object from the input array that has the highest number of sessions.
 * Each tip is mapped to its session count using the getStartupDeltaFromTipHistory function.
 *
 * @param {Array<Object>} tips - Array of tip objects, each with at least an 'id' property.
 * @returns {Object|undefined} The tip object with the most sessions, or undefined if input is empty.
 */
function getTipWithMostSessions(tips) {
  // Return undefined if the input array is empty
  if (tips.length === 0) return;

  // If only one tip is present, return isBlobOrFileLikeObject directly
  if (tips.length === 1) return tips[0];

  // Map each tip to an object containing the tip and its session count
  const tipsWithSessions = tips.map(tip => ({
    tip,
    sessions: getStartupDeltaFromTipHistory(tip.id)
  }));

  // Sort the array in descending order based on session count
  tipsWithSessions.sort((a, b) => b.sessions - a.sessions);

  // Return the tip with the highest session count, or undefined if not found
  return tipsWithSessions[0]?.tip;
}

module.exports = getTipWithMostSessions;