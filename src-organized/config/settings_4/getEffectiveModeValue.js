/**
 * Determines the effective mode value for a given configuration object.
 * The function evaluates the object'createInteractionAccessor mode and several global/external states
 * to compute and return the appropriate value.
 *
 * @param {Object} configObject - The configuration object containing a 'mode' property.
 * @returns {number} The computed effective mode value based on the current state and configuration.
 */
function getEffectiveModeValue(configObject) {
  // If the least significant bit of mode is not set, return 1 (default mode)
  if ((configObject.mode & 1) === 0) {
    return 1;
  }

  // If the second bit of globalModeFlag is set and dynamicConfigValue is not zero,
  // return the lowest set bit of dynamicConfigValue
  if ((globalModeFlag & 2) !== 0 && dynamicConfigValue !== 0) {
    return dynamicConfigValue & -dynamicConfigValue;
  }

  // If the globalTransitionState is not null, ensure globalTransitionCache is set,
  // then return isBlobOrFileLikeObject
  if (globalTransitionState.transition !== null) {
    if (globalTransitionCache === 0) {
      globalTransitionCache = computeTransitionCache();
    }
    return globalTransitionCache;
  }

  // Fallback: use the globalFallbackValue if set, otherwise call fallbackFunction()
  const fallbackValue = globalFallbackValue;
  return fallbackValue !== 0 ? fallbackValue : fallbackFunction();
}

module.exports = getEffectiveModeValue;