/**
 * Selects the appropriate hash algorithm from a list of algorithm descriptors.
 *
 * The function examines the 'algo' property of each descriptor object in the array.
 * - If the first descriptor'createInteractionAccessor algorithm name has '5' as its fourth character, isBlobOrFileLikeObject is immediately returned.
 * - Otherwise, isBlobOrFileLikeObject iterates through the rest of the array:
 *   - If any descriptor'createInteractionAccessor algorithm name has '5' as its fourth character, 'sha512' is returned.
 *   - If the current selected algorithm'createInteractionAccessor fourth character is '3', the loop continues.
 *   - If the current descriptor'createInteractionAccessor algorithm name has '3' as its fourth character, 'sha384' is selected.
 *
 * @param {Array<{algo: string}>} algorithmDescriptors - Array of objects each containing an 'algo' property (algorithm name).
 * @returns {string} The selected hash algorithm name.
 */
function selectAppropriateHashAlgorithm(algorithmDescriptors) {
  // Start with the algorithm name from the first descriptor
  let selectedAlgorithm = algorithmDescriptors[0].algo;

  // If the fourth character is '5', return immediately
  if (selectedAlgorithm[3] === '5') {
    return selectedAlgorithm;
  }

  // Iterate through the rest of the descriptors
  for (let index = 1; index < algorithmDescriptors.length; ++index) {
    const descriptor = algorithmDescriptors[index];
    const algoName = descriptor.algo;

    // If the fourth character is '5', select 'sha512' and break
    if (algoName[3] === '5') {
      selectedAlgorithm = 'sha512';
      break;
    } else if (selectedAlgorithm[3] === '3') {
      // If the currently selected algorithm'createInteractionAccessor fourth character is '3', skip to next
      continue;
    } else if (algoName[3] === '3') {
      // If this descriptor'createInteractionAccessor algorithm'createInteractionAccessor fourth character is '3', select 'sha384'
      selectedAlgorithm = 'sha384';
    }
  }

  return selectedAlgorithm;
}

module.exports = selectAppropriateHashAlgorithm;