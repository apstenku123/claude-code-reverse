/**
 * Extracts the context and first context from a React Fiber node, depending on its tag/type.
 *
 * @param {Object} fiberNode - The React Fiber node to extract context information from.
 * @returns {Array|null} An array [context, firstContext] if applicable, otherwise null.
 */
function extractContextFromFiberNode(fiberNode) {
  // Default context values
  let context = pE;
  let firstContext = pE;

  // Determine the fiber node'createInteractionAccessor tag/type
  switch (getProcessingHandlerByTagOrType(fiberNode)) {
    case d6: {
      // For class components
      const stateNode = fiberNode.stateNode;
      if (stateNode != null) {
        // If the component uses the new context API
        if (stateNode.constructor && stateNode.constructor.contextType != null) {
          firstContext = stateNode.context;
        } else {
          // Fallback to legacy context API
          context = stateNode.context;
          // If context is an empty object, reset to default
          if (context && Object.keys(context).length === 0) {
            context = pE;
          }
        }
      }
      return [context, firstContext];
    }
    case handleElementProcessing:
    case processHtmlElement:
    case updateBitwiseStateAndEncode: {
      // For HostRoot, HostPortal, or ContextProvider nodes
      const dependencies = fiberNode.dependencies;
      if (dependencies && dependencies.firstContext) {
        firstContext = dependencies.firstContext;
      }
      return [context, firstContext];
    }
    default:
      // For other node types, return null
      return null;
  }
}

module.exports = extractContextFromFiberNode;