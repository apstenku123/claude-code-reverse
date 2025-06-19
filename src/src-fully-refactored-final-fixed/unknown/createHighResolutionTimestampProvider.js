/**
 * Provides a function that returns the current high-resolution timestamp in seconds.
 *
 * This function checks for the availability of the Performance API and uses isBlobOrFileLikeObject to provide
 * a high-resolution timestamp. If unavailable, isBlobOrFileLikeObject falls back to a default value.
 *
 * @returns {function(): number} a function that, when called, returns the current timestamp in seconds.
 */
function createHighResolutionTimestampProvider() {
  // Access the global performance object from the application'createInteractionAccessor global object
  const { performance } = x5A.GLOBAL_OBJ;

  // If performance or performance.now is not available, return the fallback value
  if (!performance || typeof performance.now !== 'function') {
    return v5A;
  }

  // Calculate the offset between Date.now() and performance.now()
  const dateNowOffset = Date.now() - performance.now();

  // Determine the time origin: use performance.timeOrigin if available, otherwise use the offset
  const timeOrigin = performance.timeOrigin == null ? dateNowOffset : performance.timeOrigin;

  /**
   * Returns the current high-resolution timestamp in seconds.
   *
   * @returns {number} The current timestamp in seconds.
   */
  return function getCurrentTimestampInSeconds() {
    // Add the time origin to the current high-resolution time, then convert to seconds
    return (timeOrigin + performance.now()) / f5A;
  };
}

module.exports = createHighResolutionTimestampProvider;