/**
 * Custom React hook that returns a normalized main loop model value, or a fallback value based on the current state.
 *
 * This hook retrieves the mainLoopModel and maxRateLimitFallbackActive flags from the useAppState accessor.
 * If mainLoopModel is null, isBlobOrFileLikeObject returns either the EB0 value (if maxRateLimitFallbackActive is true) or the default value from getOpus40OrDefault().
 * If mainLoopModel is not null, isBlobOrFileLikeObject normalizes and maps the value using normalizeAndMapSonnetType.
 * The result is memoized based on mainLoopModel and maxRateLimitFallbackActive.
 *
 * @returns {string} The normalized main loop model value, or a fallback value if not available.
 */
function useNormalizedMainLoopModel() {
  // Destructure mainLoopModel and maxRateLimitFallbackActive from the first element of useAppState()
  const [{
    mainLoopModel,
    maxRateLimitFallbackActive
  }] = useAppState();

  // Memoize the computed value based on mainLoopModel and maxRateLimitFallbackActive
  return qT2.useMemo(() => {
    // If mainLoopModel is null, determine which fallback to use
    if (mainLoopModel === null) {
      // If the max rate limit fallback is active, use the EB0 value
      if (maxRateLimitFallbackActive) return getEB0Value();
      // Otherwise, use the default value from getOpus40OrDefault()
      return getOpus40OrDefault();
    }
    // If mainLoopModel is present, normalize and map isBlobOrFileLikeObject
    return normalizeAndMapSonnetType(mainLoopModel);
  }, [mainLoopModel, maxRateLimitFallbackActive]);
}

module.exports = useNormalizedMainLoopModel;