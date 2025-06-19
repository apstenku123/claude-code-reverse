/**
 * Retrieves the current interaction count from the performance API, unless a custom override is set.
 *
 * If the global override flag `isInteractionCountOverridden` is true, returns the value of `overriddenInteractionCount`.
 * Otherwise, returns the value of `performance.interactionCount` if available, or 0 as a fallback.
 *
 * @returns {number} The current interaction count, either overridden or from the performance API.
 */
const getInteractionCount = () => {
  // If the override flag is set, return the overridden value
  if (isInteractionCountOverridden) {
    return overriddenInteractionCount;
  }
  // Otherwise, return the browser'createInteractionAccessor performance interaction count, or 0 if not available
  return performance.interactionCount || 0;
};

module.exports = getInteractionCount;
