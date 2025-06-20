/**
 * Determines whether the current interaction matches the mapped route and returns the appropriate result.
 *
 * If the currentInteraction is strictly equal to the mappedInteractionRoute, returns the accessorResult.
 * Otherwise, invokes the fallbackFunction with the result of the getFallbackArguments function.
 *
 * @returns {any} The result of the accessor if interactions match, or the fallback function result otherwise.
 */
function getInteractionResultOrFallback() {
  // Check if the current interaction matches the mapped route
  if (currentInteraction === mappedInteractionRoute) {
    // Return the result from the accessor with arguments
    return accessorResult;
  } else {
    // Otherwise, call the fallback function with fallback arguments
    return fallbackFunction(getFallbackArguments());
  }
}

module.exports = getInteractionResultOrFallback;