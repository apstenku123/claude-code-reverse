/**
 * Processes a node or value in a tree-like structure, handling different types (primitive, object, iterable, etc.)
 * and returning a processed node with references and transformations applied as needed.
 *
 * @param {Object} parentNode - The parent node in the tree structure. Used to set return references and mode.
 * @param {any} currentNode - The node or value to process. Can be a primitive, object, or iterable.
 * @param {any} context - Additional context or state passed through the processing chain.
 * @returns {any|null} The processed node with references set, or null if the node is not processable.
 */
function processNode(parentNode, currentNode, context) {
  // Handle primitive string or number nodes
  if ((typeof currentNode === "string" && currentNode !== "") || typeof currentNode === "number") {
    // Convert primitive to a node using initializeWithLanes, set return reference
    let processedNode = initializeWithLanes(String(currentNode), parentNode.mode, context);
    processedNode.return = parentNode;
    return processedNode;
  }

  // Handle object nodes (elements, iterables, etc.)
  if (typeof currentNode === "object" && currentNode !== null) {
    switch (currentNode.$$typeof) {
      case createCompatibleVersionChecker: // AggregateRecentInputEntries type
        // Create a new node with createReactElementNode, set ref and return
        let aggregateNode = createReactElementNode(
          currentNode.type,
          currentNode.key,
          currentNode.props,
          null,
          parentNode.mode,
          context
        );
        aggregateNode.ref = r(parentNode, null, currentNode);
        aggregateNode.return = parentNode;
        return aggregateNode;
      case processCssDeclarations: // Some other special type (possibly Fragment)
        // Process with getAllEnumerableKeys and set return
        let specialNode = getAllEnumerableKeys(currentNode, parentNode.mode, context);
        specialNode.return = parentNode;
        return specialNode;
      case q: // Possibly a lazy or deferred node
        // Recursively process the payload
        const initializer = currentNode._init;
        return processNode(parentNode, initializer(currentNode._payload), context);
    }
    // Handle iterables or collections
    if (E1(currentNode) || BugReportForm(currentNode)) {
      let iterableNode = createCollectionIterator(currentNode, parentNode.mode, context, null);
      iterableNode.return = parentNode;
      return iterableNode;
    }
    // Fallback: check for NaN or other invalid values
    e(parentNode, currentNode);
  }
  // If none of the above, return null
  return null;
}

module.exports = processNode;