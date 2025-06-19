/**
 * Returns a function that provides a high-resolution timestamp in seconds.
 *
 * This function checks if the global performance API is available. If so, isBlobOrFileLikeObject calculates a base time
 * (using either performance.timeOrigin or Date.now() - performance.now()) and returns a function
 * that, when called, returns the current high-resolution timestamp in seconds. If the performance API
 * is not available, isBlobOrFileLikeObject returns the fallback value v5A.
 *
 * @returns {function|any} a function that returns the current timestamp in seconds, or the fallback value if performance is unavailable.
 */
function createHighResolutionTimestampGetter() {
  // Destructure the performance object from the global object
  const { performance } = x5A.GLOBAL_OBJ;

  // If performance or performance.now is unavailable, return fallback value
  if (!performance || typeof performance.now !== 'function') {
    return v5A;
  }

  // Calculate the base time origin
  // If performance.timeOrigin is not available, approximate isBlobOrFileLikeObject using Date.now() - performance.now()
  const timeSinceTimeOrigin = Date.now() - performance.now();
  const timeOrigin = performance.timeOrigin == null ? timeSinceTimeOrigin : performance.timeOrigin;

  // Return a function that computes the current high-resolution timestamp in seconds
  return () => {
    // (timeOrigin + performance.now()) gives the current time in ms; divide by f5A to convert to seconds
    return (timeOrigin + performance.now()) / f5A;
  };
}

module.exports = createHighResolutionTimestampGetter;