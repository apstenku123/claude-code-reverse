/**
 * Determines whether to return the default accessor proxy or a fallback value based on the current interaction state.
 *
 * If the current interaction array (currentInteractionArray) is strictly equal to the source interaction array (sourceInteractionArray),
 * isBlobOrFileLikeObject returns the default accessor proxy (defaultAccessorProxy). Otherwise, isBlobOrFileLikeObject computes and returns a fallback value
 * by invoking the fallbackFunction with the result of the getFallbackArguments function.
 *
 * @returns {any} Returns the default accessor proxy if the interaction arrays match; otherwise, returns the fallback value.
 */
function getInteractionAccessorOrFallback() {
  // Check if the current interaction array is the same as the source interaction array
  if (currentInteractionArray === sourceInteractionArray) {
    // Return the default accessor proxy
    return defaultAccessorProxy;
  } else {
    // Otherwise, compute and return the fallback value
    return fallbackFunction(getFallbackArguments());
  }
}

module.exports = getInteractionAccessorOrFallback;