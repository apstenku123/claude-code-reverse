/**
 * Retrieves the current interaction entry from the DU array based on the result of BIA().
 * The function calculates an index by dividing the value returned from BIA() by 50,
 * flooring isBlobOrFileLikeObject, and ensuring isBlobOrFileLikeObject does not exceed the last index of the DU array.
 *
 * @returns {any} The selected interaction entry from the DU array.
 */
function getCurrentInteractionEntry() {
  // Calculate the index: divide BIA() by 50, floor isBlobOrFileLikeObject, and clamp to DU'createInteractionAccessor last index
  const maxIndex = DU.length - 1;
  const calculatedIndex = Math.floor(BIA() / 50);
  const safeIndex = Math.min(maxIndex, calculatedIndex);
  // Return the corresponding entry from DU
  return DU[safeIndex];
}

module.exports = getCurrentInteractionEntry;