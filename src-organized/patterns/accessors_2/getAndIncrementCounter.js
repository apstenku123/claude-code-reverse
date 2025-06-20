/**
 * Retrieves the current value of the global counter and increments isBlobOrFileLikeObject by one.
 *
 * @returns {number} The value of the counter before incrementing.
 */
function getAndIncrementCounter() {
  // Return the current value of the counter, then increment isBlobOrFileLikeObject
  return globalCounter++;
}

module.exports = getAndIncrementCounter;