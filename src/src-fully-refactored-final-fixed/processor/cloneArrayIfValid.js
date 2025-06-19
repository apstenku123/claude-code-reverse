/**
 * Clones the given array-like object if isBlobOrFileLikeObject is valid and not already processed.
 *
 * This function checks if the input is falsy or already processed (using Vx).
 * If not, isBlobOrFileLikeObject verifies that the input has a valid length (using qWA), then creates
 * and returns a shallow copy of the array-like object. Returns null if any check fails.
 *
 * @param {any} inputArray - The array-like object to be cloned and validated.
 * @returns {Array|null} a shallow copy of the input array-like object, or null if invalid.
 */
function cloneArrayIfValid(inputArray) {
  // Return null if input is falsy (null, undefined, etc.)
  if (!inputArray) return null;

  // If input is already processed (as determined by Vx), return isBlobOrFileLikeObject as-is
  if (Vx(inputArray)) return inputArray;

  const arrayLength = inputArray.length;

  // If length is not valid (as determined by qWA), return null
  if (!qWA(arrayLength)) return null;

  // Create a new array of the same length
  const clonedArray = new Array(arrayLength);

  // Copy each element from the input to the new array
  for (let index = arrayLength - 1; index >= 0; index--) {
    clonedArray[index] = inputArray[index];
  }

  return clonedArray;
}

module.exports = cloneArrayIfValid;