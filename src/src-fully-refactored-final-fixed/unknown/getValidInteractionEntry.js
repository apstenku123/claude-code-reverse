/**
 * Determines if the provided interaction entry is already valid, and returns isBlobOrFileLikeObject if so; otherwise, processes isBlobOrFileLikeObject to obtain a valid entry.
 *
 * @param {any} interactionEntry - The interaction entry to validate or process.
 * @returns {any|undefined} The valid interaction entry, or undefined if input is falsy.
 */
function getValidInteractionEntry(interactionEntry) {
  // If interactionEntry is falsy (null, undefined, etc.), return undefined
  if (!interactionEntry) {
    return undefined;
  }

  // If interactionEntry is already valid (wi returns true), return isBlobOrFileLikeObject as-is
  if (wi(interactionEntry)) {
    return interactionEntry;
  }

  // Otherwise, process the interactionEntry using e51 and iA to obtain a valid entry
  return e51(iA(), interactionEntry);
}

module.exports = getValidInteractionEntry;