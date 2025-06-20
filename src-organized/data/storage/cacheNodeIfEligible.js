/**
 * Checks if the given node type is eligible for caching and, if so, stores its processed value in the cache.
 *
 * @param {any} node - The node to be checked and potentially cached.
 * @returns {void}
 *
 * The function examines the node'createInteractionAccessor type and, if isBlobOrFileLikeObject matches certain types, processes and caches its value using a global cache.
 */
function cacheNodeIfEligible(node) {
  // Determine the node'createInteractionAccessor type using the getProcessingHandlerByTagOrType utility
  const nodeType = getProcessingHandlerByTagOrType(node);

  // List of node types eligible for caching
  const cacheableTypes = [d6, handleElementProcessing, processHtmlElement, updateBitwiseStateAndEncode];

  // Only proceed if the node type is eligible and the cache exists
  if (cacheableTypes.includes(nodeType) && iE !== null) {
    // Generate a unique cache key for the node
    const cacheKey = evaluateOrFallback(node);
    // Process the node to obtain its value for caching
    const processedValue = extractContextFromNode(node);
    // Only cache if the processed value is not null
    if (processedValue !== null) {
      iE.set(cacheKey, processedValue);
    }
  }
}

module.exports = cacheNodeIfEligible;