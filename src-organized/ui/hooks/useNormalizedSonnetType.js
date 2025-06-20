/**
 * Retrieves and normalizes the current sonnet type from the main loop model, with fallbacks.
 * Uses React'createInteractionAccessor useMemo to memoize the result based on dependencies.
 *
 * @returns {string} The normalized sonnet type, or a fallback value if unavailable.
 */
function useNormalizedSonnetType() {
  // Destructure mainLoopModel and maxRateLimitFallbackActive from the first element returned by useAppState()
  const [{
    mainLoopModel,
    maxRateLimitFallbackActive
  }] = useAppState();

  // Memoize the computation to avoid unnecessary recalculations
  return qT2.useMemo(() => {
    // If mainLoopModel is null, determine fallback
    if (mainLoopModel === null) {
      // If rate limit fallback is active, return EB0 value
      if (maxRateLimitFallbackActive) return getEB0Value();
      // Otherwise, return the result of getOpus40OrDefault()
      return getOpus40OrDefault();
    }
    // Otherwise, normalize and map the sonnet type from mainLoopModel
    return normalizeAndMapSonnetType(mainLoopModel);
  }, [mainLoopModel, maxRateLimitFallbackActive]);
}

module.exports = useNormalizedSonnetType;