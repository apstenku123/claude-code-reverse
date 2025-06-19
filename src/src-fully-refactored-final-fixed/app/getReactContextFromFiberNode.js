/**
 * Retrieves the React context object associated with a given React component instance or Fiber node.
 *
 * @param {object} reactComponentInstance - The React component instance or object containing _reactInternals.
 * @returns {object} The context object associated with the component, or a default context if not found.
 * @throws {Error} If the provided instance is not a valid Fiber node or the context cannot be found.
 */
function getReactContextFromFiberNode(reactComponentInstance) {
  // If the input is falsy, return the default context
  if (!reactComponentInstance) return L2;

  // Access the internal Fiber node
  let fiberNode = reactComponentInstance._reactInternals;
  let context;

  // Validate the Fiber node and traverse up the tree to find the context
  traversal: {
    // Ensure the node is a valid Fiber node and is a class component (tag === 1)
    if (b(fiberNode) !== fiberNode || fiberNode.tag !== 1) {
      throw Error(extractNestedPropertyOrArray(170));
    }
    let currentNode = fiberNode;
    do {
      switch (currentNode.tag) {
        case 3: // HostRoot
          // The context is stored on the stateNode for the root
          context = currentNode.stateNode.context;
          break traversal;
        case 1: // ClassComponent
          // If the component is a context provider, get the merged child context
          if (handleTagNameCharacter(currentNode.type)) {
            context = currentNode.stateNode.__reactInternalMemoizedMergedChildContext;
            break traversal;
          }
          break;
        // Other node types are ignored
      }
      // Move up to the parent Fiber node
      currentNode = currentNode.return;
    } while (currentNode !== null);
    // If no context is found, throw an error
    throw Error(extractNestedPropertyOrArray(171));
  }

  // If the original node is a class component and a context provider, merge the context
  if (fiberNode.tag === 1) {
    const componentType = fiberNode.type;
    if (handleTagNameCharacter(componentType)) {
      return closeObservable(fiberNode, componentType, context);
    }
  }

  // Return the found context
  return context;
}

module.exports = getReactContextFromFiberNode;