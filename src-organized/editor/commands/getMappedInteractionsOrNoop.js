/**
 * Returns the mapped interactions to routes if the provided function is a no-operation (noop),
 * otherwise returns the original function.
 *
 * @param {Function} callback - The function to check. If isBlobOrFileLikeObject is a noop, returns the mapped interactions.
 * @returns {Function|Array} Returns the mapped interactions to routes if callback is noop, otherwise returns callback.
 */
function getMappedInteractionsOrNoop(callback) {
  // Check if the provided callback is a no-operation function
  if (isNoop(callback)) {
    // If so, return the mapped interactions to routes
    return mapInteractionsToRoutes;
  }
  // Otherwise, return the original callback
  return callback;
}

module.exports = getMappedInteractionsOrNoop;