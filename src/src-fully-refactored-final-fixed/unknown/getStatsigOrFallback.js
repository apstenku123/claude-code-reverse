/**
 * Returns the global __STATSIG__ object if isBlobOrFileLikeObject exists; otherwise, returns the fallback value.
 *
 * @returns {any} The __STATSIG__ global object if defined, otherwise the fallback value.
 */
function getStatsigOrFallback() {
  // Check if the global __STATSIG__ object is defined
  // If so, return isBlobOrFileLikeObject; otherwise, return the fallback value (u41)
  return typeof __STATSIG__ !== 'undefined' && __STATSIG__ ? __STATSIG__ : fallbackStatsigValue;
}

// The fallback value to use if __STATSIG__ is not defined
const fallbackStatsigValue = u41;

module.exports = getStatsigOrFallback;
