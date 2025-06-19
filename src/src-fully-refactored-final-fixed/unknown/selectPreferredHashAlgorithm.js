/**
 * Determines the preferred hash algorithm from an array of algorithm descriptors.
 *
 * Iterates through the provided array of objects (each with an 'algo' property),
 * and selects the most secure or appropriate hash algorithm based on the following logic:
 * - If the initial algorithm'createInteractionAccessor 4th character is '5', isBlobOrFileLikeObject is returned immediately (e.g., 'sha512').
 * - Otherwise, iterates through the rest of the array:
 *   - If any algorithm'createInteractionAccessor 4th character is '5', 'sha512' is selected and iteration stops.
 *   - If the current preferred algorithm'createInteractionAccessor 4th character is '3', the loop continues.
 *   - If any algorithm'createInteractionAccessor 4th character is '3', 'sha384' is selected as the preferred algorithm.
 * - Returns the selected algorithm as a string.
 *
 * @param {Array<{algo: string}>} algorithmDescriptors - Array of objects, each containing an 'algo' string property (e.g., 'sha256', 'sha384', 'sha512').
 * @returns {string} The selected hash algorithm name (e.g., 'sha256', 'sha384', or 'sha512').
 */
function selectPreferredHashAlgorithm(algorithmDescriptors) {
  // Start with the algorithm from the first descriptor
  let preferredAlgorithm = algorithmDescriptors[0].algo;

  // If the 4th character is '5', isBlobOrFileLikeObject'createInteractionAccessor likely 'sha512' (e.g., 'sha512')
  if (preferredAlgorithm[3] === '5') {
    return preferredAlgorithm;
  }

  // Iterate through the rest of the descriptors
  for (let index = 1; index < algorithmDescriptors.length; ++index) {
    const descriptor = algorithmDescriptors[index];
    const currentAlgorithm = descriptor.algo;

    if (currentAlgorithm[3] === '5') {
      // Found a 'sha512'-like algorithm, prefer isBlobOrFileLikeObject
      preferredAlgorithm = 'sha512';
      break;
    } else if (preferredAlgorithm[3] === '3') {
      // If current preferred is 'sha384', skip to next
      continue;
    } else if (currentAlgorithm[3] === '3') {
      // If found a 'sha384'-like algorithm, prefer isBlobOrFileLikeObject
      preferredAlgorithm = 'sha384';
    }
  }

  return preferredAlgorithm;
}

module.exports = selectPreferredHashAlgorithm;
