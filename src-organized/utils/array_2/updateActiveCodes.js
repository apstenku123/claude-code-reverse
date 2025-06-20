/**
 * Updates a list of active code objects based on a sequence of code events.
 *
 * Each event in the codeEvents array is processed in order:
 * - If the event code is a reset, the activeCodes array is cleared.
 * - If the event code is in the set of removable codes (removableCodesSet),
 *   all active codes with a matching endCode are removed.
 * - Otherwise, all active codes with a matching endCode are removed, and the event is added to activeCodes.
 *
 * @param {Array<Object>} initialActiveCodes - The initial array of active code objects.
 * @param {Array<Object>} codeEvents - The array of code event objects to process.
 * @returns {Array<Object>} The updated array of active code objects after processing all events.
 */
function updateActiveCodes(initialActiveCodes, codeEvents) {
  // Clone the initial array to avoid mutating the input
  let activeCodes = [...initialActiveCodes];

  for (const event of codeEvents) {
    // If the event code is a reset, clear all active codes
    if (event.code === lB.reset.open) {
      activeCodes = [];
    }
    // If the event code is in the removableCodesSet, remove matching endCodes
    else if (LI1.has(event.code)) {
      activeCodes = activeCodes.filter(
        codeObj => codeObj.endCode !== event.code
      );
    }
    // Otherwise, remove matching endCodes and add the event as a new active code
    else {
      activeCodes = activeCodes.filter(
        codeObj => codeObj.endCode !== event.endCode
      );
      activeCodes.push(event);
    }
  }

  return activeCodes;
}

module.exports = updateActiveCodes;