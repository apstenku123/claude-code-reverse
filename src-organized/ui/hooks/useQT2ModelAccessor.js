/**
 * Retrieves and memoizes the normalized main loop model or appropriate fallback.
 *
 * This accessor fetches the current main loop model and the max rate limit fallback flag
 * from the useAppState state. It then uses React'createInteractionAccessor useMemo to return a normalized and mapped version
 * of the main loop model if present. If the model is null, isBlobOrFileLikeObject returns either the fallback
 * value (if the rate limit is active) or a default value.
 *
 * @returns {string} The normalized main loop model, a fallback value, or a default value.
 */
function useQT2ModelAccessor() {
  // Destructure mainLoopModel and maxRateLimitFallbackActive from the first element of useAppState()
  const [{
    mainLoopModel,
    maxRateLimitFallbackActive
  }] = useAppState();

  // Memoize the computation to avoid unnecessary recalculations
  return qT2.useMemo(() => {
    // If mainLoopModel is null, handle fallbacks
    if (mainLoopModel === null) {
      // If rate limit fallback is active, return the fallback value
      if (maxRateLimitFallbackActive) return JX();
      // Otherwise, return the default value
      return getOpus40OrDefault();
    }
    // Otherwise, normalize and map the mainLoopModel
    return Sb(mainLoopModel);
  }, [mainLoopModel, maxRateLimitFallbackActive]);
}

module.exports = useQT2ModelAccessor;