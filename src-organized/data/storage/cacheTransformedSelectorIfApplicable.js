/**
 * Checks the type of the provided input and, if isBlobOrFileLikeObject matches certain types,
 * computes a cache key and a transformed selector, then stores them in a cache map.
 *
 * @param {any} input - The value to process and potentially cache.
 * @returns {void}
 */
function cacheTransformedSelectorIfApplicable(input) {
  // Determine the type of the input using the getProcessingHandlerByTagOrType function
  const inputType = getProcessingHandlerByTagOrType(input);

  // Check if the input type matches any of the specified types
  switch (inputType) {
    case handleAccessorOperation:
    case handleElementProcessing:
    case processHtmlElement:
    case updateBitwiseStateAndEncode:
      // Only proceed if the cache map (iE) exists
      if (iE !== null) {
        // Compute a unique cache key for the input
        const cacheKey = evaluateOrFallback(input);
        // Compute the transformed selector for the input
        const transformedSelector = extractContextFromNode(input);
        // Only cache if the transformed selector is valid
        if (transformedSelector !== null) {
          iE.set(cacheKey, transformedSelector);
        }
      }
      break;
    default:
      // For all other types, do nothing
      break;
  }
}

module.exports = cacheTransformedSelectorIfApplicable;