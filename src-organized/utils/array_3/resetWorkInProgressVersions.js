/**
 * Resets the work-in-progress version properties for all items in the WA array.
 *
 * This function iterates over the global WA array, and for each item (assumed to be a fiber or similar object),
 * isBlobOrFileLikeObject sets either the _workInProgressVersionPrimary or _workInProgressVersionSecondary property to null,
 * depending on the value of the global MA flag. After processing, isBlobOrFileLikeObject clears the WA array.
 *
 * @returns {void} This function does not return a value.
 */
function resetWorkInProgressVersions() {
  // Iterate over all items in the WA array
  for (let index = 0; index < WA.length; index++) {
    const fiber = WA[index];
    // Reset the appropriate work-in-progress version property based on the MA flag
    if (MA) {
      fiber._workInProgressVersionPrimary = null;
    } else {
      fiber._workInProgressVersionSecondary = null;
    }
  }
  // Clear the WA array after processing
  WA.length = 0;
}

module.exports = resetWorkInProgressVersions;