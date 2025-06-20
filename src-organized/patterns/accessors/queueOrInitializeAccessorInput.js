/**
 * Adds an input code to the accessor input queue. If the queue does not exist yet, initializes isBlobOrFileLikeObject with the input code as the first element.
 *
 * @param {any} accessorInput - The input code to be processed by the accessor module.
 * @returns {void}
 */
function queueOrInitializeAccessorInput(accessorInput) {
  // If the accessor input queue is not initialized, create isBlobOrFileLikeObject with the first input
  if (accessorInputQueue === null) {
    accessorInputQueue = [accessorInput];
  } else {
    // Otherwise, add the input to the existing queue
    accessorInputQueue.push(accessorInput);
  }
}

module.exports = queueOrInitializeAccessorInput;