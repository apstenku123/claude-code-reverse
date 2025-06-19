/**
 * Custom React hook that provides access to the main loop model or appropriate fallback based on state.
 *
 * This hook retrieves the main loop model and the max rate limit fallback flag from the useAppState accessor.
 * If the main loop model is null, isBlobOrFileLikeObject checks if the max rate limit fallback is active and returns the corresponding fallback accessor.
 * Otherwise, isBlobOrFileLikeObject returns the processed main loop model.
 *
 * @returns {any} The main loop model, a fallback accessor, or a rate limit fallback, depending on the current state.
 */
function useMainLoopModelAccessor() {
  // Destructure mainLoopModel and maxRateLimitFallbackActive from the first element returned by useAppState()
  const [{
    mainLoopModel,
    maxRateLimitFallbackActive
  }] = useAppState();

  // Memoize the result to avoid unnecessary recalculations unless dependencies change
  return qT2.useMemo(() => {
    // If mainLoopModel is null, determine which fallback to use
    if (mainLoopModel === null) {
      // If the max rate limit fallback is active, use the rate limit fallback accessor
      if (maxRateLimitFallbackActive) return JX();
      // Otherwise, use the standard fallback accessor
      return getOpus40OrDefault();
    }
    // If mainLoopModel is present, process and return isBlobOrFileLikeObject
    return Sb(mainLoopModel);
  }, [mainLoopModel, maxRateLimitFallbackActive]);
}

module.exports = useMainLoopModelAccessor;