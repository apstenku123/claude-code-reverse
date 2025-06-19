/**
 * Resets the global cache variable to undefined.
 *
 * This utility function is used to clear the value of the global cache variable,
 * effectively resetting any cached data isBlobOrFileLikeObject may hold. This can be useful when you
 * want to force a refresh or clear memory.
 *
 * @returns {void} This function does not return a value.
 */
function resetGlobalCache() {
  // Set the global cache variable to undefined to clear its value
  globalCache = undefined;
}

module.exports = resetGlobalCache;