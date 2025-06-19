/**
 * Processes a node (could be a string, number, or object) and applies the appropriate transformation or handler based on its type and properties.
 *
 * @param {Map} nodeMap - a Map object that stores nodes by key.
 * @param {Object} parentNode - The parent node or context in which processing occurs.
 * @param {string|number} defaultKey - The default key to use for lookup in the nodeMap.
 * @param {string|number|Object} nodeToProcess - The node to process. Can be a string, number, or an object with special properties.
 * @param {any} additionalContext - Additional context or data to pass to handler functions.
 * @returns {any} The result of processing the node, or null if no processing was performed.
 */
function processNodeWithKey(nodeMap, parentNode, defaultKey, nodeToProcess, additionalContext) {
  // Handle primitive types: string (non-empty) or number
  if ((typeof nodeToProcess === "string" && nodeToProcess !== "") || typeof nodeToProcess === "number") {
    // Attempt to get the previous node by key, or null if not found
    const previousNode = nodeMap.get(defaultKey) || null;
    // Process primitive node using getOrUpdateIterableHelper
    return getOrUpdateIterableHelper(parentNode, previousNode, String(nodeToProcess), additionalContext);
  }

  // Handle objects (non-null)
  if (typeof nodeToProcess === "object" && nodeToProcess !== null) {
    switch (nodeToProcess.$$typeof) {
      case createCompatibleVersionChecker: {
        // Handle type createCompatibleVersionChecker(e.g., an element)
        const key = nodeToProcess.key === null ? defaultKey : nodeToProcess.key;
        const previousNode = nodeMap.get(key) || null;
        return fA(parentNode, previousNode, nodeToProcess, additionalContext);
      }
      case processCssDeclarations: {
        // Handle type processCssDeclarations(e.g., a fragment)
        const key = nodeToProcess.key === null ? defaultKey : nodeToProcess.key;
        const previousNode = nodeMap.get(key) || null;
        return F0(parentNode, previousNode, nodeToProcess, additionalContext);
      }
      case q: {
        // Handle type q (e.g., a lazy node)
        const initializer = nodeToProcess._init;
        // Recursively process the initialized payload
        return processNodeWithKey(
          nodeMap,
          parentNode,
          defaultKey,
          initializer(nodeToProcess._payload),
          additionalContext
        );
      }
    }
    // Handle special object types via E1 or BugReportForm
    if (E1(nodeToProcess) || BugReportForm(nodeToProcess)) {
      const previousNode = nodeMap.get(defaultKey) || null;
      return getOrUpdateIterableHelper(parentNode, previousNode, nodeToProcess, additionalContext, null);
    }
    // Fallback: call e for unknown object types
    e(parentNode, nodeToProcess);
  }

  // If none of the above, return null
  return null;
}

module.exports = processNodeWithKey;