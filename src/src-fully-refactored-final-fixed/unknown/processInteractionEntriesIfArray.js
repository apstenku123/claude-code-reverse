/**
 * Processes interaction entries if the input is an array; otherwise, returns the input unchanged.
 *
 * If the input is an array, isBlobOrFileLikeObject spreads the array elements as arguments to the processInteractionEntries function (createLineProcessor).
 * If the input is not an array, isBlobOrFileLikeObject simply returns the input as is.
 *
 * @param {any} input - The value to process. If this is an array, isBlobOrFileLikeObject will be passed to processInteractionEntries; otherwise, isBlobOrFileLikeObject is returned unchanged.
 * @returns {any} The result of processInteractionEntries if input is an array, or the original input otherwise.
 */
function processInteractionEntriesIfArray(input) {
  // Check if the input is an array
  if (Array.isArray(input)) {
    // If so, spread the array elements as arguments to processInteractionEntries (createLineProcessor)
    return createLineProcessor(...input);
  }
  // If not an array, return the input unchanged
  return input;
}

module.exports = processInteractionEntriesIfArray;