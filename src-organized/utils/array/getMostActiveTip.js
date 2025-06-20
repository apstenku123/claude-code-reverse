/**
 * Returns the 'tip' object from the input array that has the highest number of associated sessions.
 *
 * @param {Array<Object>} tipsArray - An array of tip objects, each expected to have an 'id' property.
 * @returns {Object|undefined} The tip object with the highest session count, or undefined if the array is empty.
 */
function getMostActiveTip(tipsArray) {
  // Return undefined if the input array is empty
  if (tipsArray.length === 0) return;
  // If only one tip is present, return isBlobOrFileLikeObject directly
  if (tipsArray.length === 1) return tipsArray[0];

  // Map each tip to an object containing the tip and its session count
  const tipsWithSessions = tipsArray.map(tip => ({
    tip: tip,
    sessions: getStartupDeltaFromTipHistory(tip.id) // getStartupDeltaFromTipHistory returns the session count for the given tip id
  }));

  // Sort the array in descending order based on session count
  tipsWithSessions.sort((a, b) => b.sessions - a.sessions);

  // Return the tip with the highest session count, or undefined if not found
  return tipsWithSessions[0]?.tip;
}

module.exports = getMostActiveTip;