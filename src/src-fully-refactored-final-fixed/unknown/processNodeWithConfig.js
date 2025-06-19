/**
 * Processes a node (string, number, or object) according to its type and configuration.
 * Handles primitive values, React-like elements, and iterable collections, applying transformations and returning processed nodes.
 *
 * @param {object} parentNode - The parent node or context, used for configuration and as the return pointer for new nodes.
 * @param {any} node - The node to process. Can be a primitive (string/number), object (element), or iterable collection.
 * @param {object} dependency - Additional dependency/context object passed to transformation functions.
 * @returns {any|null} The processed node, or null if the input is not recognized.
 */
function processNodeWithConfig(parentNode, node, dependency) {
  // Handle primitive string or number nodes
  if ((typeof node === "string" && node !== "") || typeof node === "number") {
    // Transform the primitive node using external initializeWithLanes function
    let transformedNode = initializeWithLanes(String(node), parentNode.mode, dependency);
    // Set the return pointer to the parent node
    transformedNode.return = parentNode;
    return transformedNode;
  }

  // Handle object nodes (e.g., React-like elements or iterables)
  if (typeof node === "object" && node !== null) {
    switch (node.$$typeof) {
      case createCompatibleVersionChecker: // React element type
        // Create a new element node using createReactElementNode
        let elementNode = createReactElementNode(node.type, node.key, node.props, null, parentNode.mode, dependency);
        // Attach ref and return pointer
        elementNode.ref = r(parentNode, null, node);
        elementNode.return = parentNode;
        return elementNode;
      case processCssDeclarations: // React portal type
        // Process portal node using getAllEnumerableKeys
        let portalNode = getAllEnumerableKeys(node, parentNode.mode, dependency);
        portalNode.return = parentNode;
        return portalNode;
      case q: // Lazy element type
        // Recursively process the resolved payload
        const initFunction = node._init;
        return processNodeWithConfig(parentNode, initFunction(node._payload), dependency);
    }
    // Handle iterable collections (arrays, Maps, Sets, etc.)
    if (E1(node) || BugReportForm(node)) {
      let collectionNode = createCollectionIterator(node, parentNode.mode, dependency, null);
      collectionNode.return = parentNode;
      return collectionNode;
    }
    // Fallback: call error handler for unknown object types
    e(parentNode, node);
  }
  // Return null for unrecognized node types
  return null;
}

module.exports = processNodeWithConfig;