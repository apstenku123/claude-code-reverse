/**
 * Resolves and processes a child node based on its type and key, handling primitives, React elements, and special objects.
 *
 * @param {Map} previousChildrenMap - Map of previous child nodes, keyed by their identifier.
 * @param {Object} parentNode - The parent node or container for the child.
 * @param {string|number} childKey - The key or identifier for the child node.
 * @param {*} childNode - The child node to process. Can be a primitive, object, or React element.
 * @param {*} context - Additional context or configuration for processing.
 * @returns {*} The result of processing the child node, or null if not processed.
 */
function resolveChildNode(previousChildrenMap, parentNode, childKey, childNode, context) {
  // Handle primitive child nodes (string or number)
  if ((typeof childNode === "string" && childNode !== "") || typeof childNode === "number") {
    const previousChild = previousChildrenMap.get(childKey) || null;
    // getOrUpdateIterableHelper: Handles primitive child reconciliation
    return getOrUpdateIterableHelper(parentNode, previousChild, String(childNode), context);
  }

  // Handle object child nodes (including React elements and special objects)
  if (typeof childNode === "object" && childNode !== null) {
    switch (childNode.$$typeof) {
      case createCompatibleVersionChecker: // React element type createCompatibleVersionChecker
        {
          const keyToUse = childNode.key === null ? childKey : childNode.key;
          const previousChild = previousChildrenMap.get(keyToUse) || null;
          // fA: Handles reconciliation for type createCompatibleVersionChecker
          return fA(parentNode, previousChild, childNode, context);
        }
      case processCssDeclarations: // React element type processCssDeclarations
        {
          const keyToUse = childNode.key === null ? childKey : childNode.key;
          const previousChild = previousChildrenMap.get(keyToUse) || null;
          // F0: Handles reconciliation for type processCssDeclarations
          return F0(parentNode, previousChild, childNode, context);
        }
      case q: // Special lazy or wrapped type
        {
          const initializer = childNode._init;
          // Recursively resolve the payload
          return resolveChildNode(
            previousChildrenMap,
            parentNode,
            childKey,
            initializer(childNode._payload),
            context
          );
        }
    }
    // Handle arrays or iterable objects
    if (E1(childNode) || BugReportForm(childNode)) {
      const previousChild = previousChildrenMap.get(childKey) || null;
      // getOrUpdateIterableHelper: Handles reconciliation for arrays or iterables
      return getOrUpdateIterableHelper(parentNode, previousChild, childNode, context, null);
    }
    // Fallback: process as a generic object
    e(parentNode, childNode);
  }

  // Return null if the child node could not be processed
  return null;
}

module.exports = resolveChildNode;