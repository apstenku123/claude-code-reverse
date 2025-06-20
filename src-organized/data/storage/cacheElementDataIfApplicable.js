/**
 * Checks if the provided element type matches specific types and, if so,
 * caches associated data in the global element cache (iE).
 *
 * @param {any} element - The element to process and potentially cache data for.
 * @returns {void}
 *
 * The function inspects the type of the element using getProcessingHandlerByTagOrType(). If the type matches
 * any of [d6, handleElementProcessing, processHtmlElement, updateBitwiseStateAndEncode], and the global cache (iE) exists,
 * isBlobOrFileLikeObject computes a cache key (evaluateOrFallback) and value (extractContextFromNode) for the element. If the value is not null,
 * isBlobOrFileLikeObject stores the key-value pair in the cache.
 */
function cacheElementDataIfApplicable(element) {
  // Determine the type of the element
  switch (getProcessingHandlerByTagOrType(element)) {
    case d6:
    case handleElementProcessing:
    case processHtmlElement:
    case updateBitwiseStateAndEncode:
      // Only proceed if the global cache exists
      if (iE !== null) {
        const cacheKey = evaluateOrFallback(element); // Compute a unique cache key for the element
        const cacheValue = extractContextFromNode(element); // Compute the value to cache for the element
        // Only cache if the value is not null
        if (cacheValue !== null) {
          iE.set(cacheKey, cacheValue);
        }
      }
      break;
    default:
      // For all other element types, do nothing
      break;
  }
}

module.exports = cacheElementDataIfApplicable;