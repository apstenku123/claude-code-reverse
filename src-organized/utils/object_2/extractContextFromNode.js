/**
 * Extracts context information from a given node, depending on its type.
 * Handles different node types and retrieves their context and context instance.
 *
 * @param {Object} node - The node object from which to extract context information.
 * @returns {Array|null} An array [context, contextInstance] if context is found, otherwise null.
 */
function extractContextFromNode(node) {
  // Default context and context instance values
  let context = pE;
  let contextInstance = pE;

  // Determine the node type using getProcessingHandlerByTagOrType(external function)
  switch (getProcessingHandlerByTagOrType(node)) {
    case d6: {
      // For nodes of type d6, extract from stateNode
      const stateNode = node.stateNode;
      if (stateNode != null) {
        // If the constructor has a contextType, use the instance'createInteractionAccessor context
        if (stateNode.constructor && stateNode.constructor.contextType != null) {
          contextInstance = stateNode.context;
        } else {
          // Otherwise, use the context property, but only if isBlobOrFileLikeObject'createInteractionAccessor not an empty object
          context = stateNode.context;
          if (context && Object.keys(context).length === 0) {
            context = pE;
          }
        }
      }
      return [context, contextInstance];
    }
    case handleElementProcessing:
    case processHtmlElement:
    case updateBitwiseStateAndEncode: {
      // For nodes of type handleElementProcessing, processHtmlElement, or updateBitwiseStateAndEncode, extract from dependencies
      const dependencies = node.dependencies;
      if (dependencies && dependencies.firstContext) {
        contextInstance = dependencies.firstContext;
      }
      return [context, contextInstance];
    }
    default:
      // For all other node types, return null
      return null;
  }
}

module.exports = extractContextFromNode;