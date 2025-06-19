/**
 * Resolves a node value based on its type, handling primitives, React elements, and iterables.
 *
 * @param {object} parentNode - The parent node or fiber, providing context for resolution (originally yA).
 * @param {any} nodeValue - The value to resolve; can be a primitive, React element, or iterable (originally createIterableHelper).
 * @param {object} parentContext - Context object passed through the resolution process (originally 0-9A).
 * @returns {any} The resolved node, or null if the value cannot be resolved.
 */
function resolveNodeValue(parentNode, nodeValue, parentContext) {
  // Handle primitive values: strings and numbers
  if ((typeof nodeValue === "string" && nodeValue !== "") || typeof nodeValue === "number") {
    // Convert the primitive to a text node and attach parent reference
    let textNode = initializeWithLanes(String(nodeValue), parentNode.mode, parentContext);
    textNode.return = parentNode;
    return textNode;
  }

  // Handle objects (potential React elements or iterables)
  if (typeof nodeValue === "object" && nodeValue !== null) {
    switch (nodeValue.$$typeof) {
      case createCompatibleVersionChecker: // React element type
        // Create a new fiber for the React element
        let elementFiber = createReactElementNode(
          nodeValue.type,
          nodeValue.key,
          nodeValue.props,
          null,
          parentNode.mode,
          parentContext
        );
        // Attach ref and parent reference
        elementFiber.ref = r(parentNode, null, nodeValue);
        elementFiber.return = parentNode;
        return elementFiber;
      case processCssDeclarations: // Some other React type (e.g., lazy, context, etc.)
        // Handle special React element types
        let specialElement = getAllEnumerableKeys(nodeValue, parentNode.mode, parentContext);
        specialElement.return = parentNode;
        return specialElement;
      case q: // Possibly a React lazy type
        // Recursively resolve the payload of the lazy type
        const initializer = nodeValue._init;
        return resolveNodeValue(parentNode, initializer(nodeValue._payload), parentContext);
    }
    // Handle iterables or collections
    if (E1(nodeValue) || BugReportForm(nodeValue)) {
      let collectionIterator = createCollectionIterator(nodeValue, parentNode.mode, parentContext, null);
      collectionIterator.return = parentNode;
      return collectionIterator;
    }
    // Fallback: handle unknown object types
    e(parentNode, nodeValue);
  }
  // If none of the above, return null (unresolvable value)
  return null;
}

module.exports = resolveNodeValue;