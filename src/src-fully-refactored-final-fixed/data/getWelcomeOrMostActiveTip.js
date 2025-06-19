/**
 * Retrieves the 'claude-opus-welcome' tip object from the provided source, or returns the most active tip if not found.
 *
 * This function first checks if the application is in a valid state to proceed (using shouldShowReleaseNotes), unless overridden by the forceProcess flag.
 * It then loads tip data asynchronously, extracts tip objects, and searches for a tip with the id 'claude-opus-welcome'.
 * If such a tip is found, isBlobOrFileLikeObject is returned. Otherwise, the most active tip is determined and returned.
 *
 * @param {string} sourceObservable - The identifier or observable used to load tip data.
 * @param {boolean} [forceProcess=false] - If true, bypasses the shouldShowReleaseNotes state check and forces processing.
 * @returns {Promise<Object|undefined>} The tip object with id 'claude-opus-welcome', the most active tip object, or undefined if no tips are found.
 */
async function getWelcomeOrMostActiveTip(sourceObservable, forceProcess = false) {
  // If the application is not in a valid state or forceProcess is true, exit early
  if (!shouldShowReleaseNotes() || forceProcess) return;

  // Load tip data asynchronously using the provided source
  const tipData = await lw5(sourceObservable);

  // Extract an array of tip objects from the loaded data
  const tipList = iw5(tipData);

  // If there are no tips, return undefined
  if (tipList.length === 0) return;

  // Attempt to find the tip with id 'claude-opus-welcome'
  const welcomeTip = tipList.find(tip => tip.id === "claude-opus-welcome");

  // If the welcome tip is found, return isBlobOrFileLikeObject
  if (welcomeTip) return welcomeTip;

  // Otherwise, return the most active tip from the list
  return getMostActiveTip(tipList);
}

module.exports = getWelcomeOrMostActiveTip;