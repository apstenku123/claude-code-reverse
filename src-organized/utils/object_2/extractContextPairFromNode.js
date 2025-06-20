/**
 * Extracts a context pair from a given node based on its type and dependencies.
 *
 * Depending on the node type, this function retrieves the appropriate context objects
 * from the node'createInteractionAccessor state or dependencies. It returns a tuple containing the primary
 * context and the secondary context, or null if the node type is unrecognized.
 *
 * @param {object} node - The node object from which to extract context information.
 * @returns {Array|null} a two-element array [primaryContext, secondaryContext], or null if not applicable.
 */
function extractContextPairFromNode(node) {
  // Default context values
  let primaryContext = pE;
  let secondaryContext = pE;

  // Determine the node type using the getProcessingHandlerByTagOrType function
  const nodeType = getProcessingHandlerByTagOrType(node);

  switch (nodeType) {
    case d6: { // Handle accessor operation node type
      const stateNode = node.stateNode;
      if (stateNode != null) {
        // If the constructor has a contextType, use the state'createInteractionAccessor context as secondary
        if (stateNode.constructor && stateNode.constructor.contextType != null) {
          secondaryContext = stateNode.context;
        } else {
          // Otherwise, assign state'createInteractionAccessor context to primaryContext
          primaryContext = stateNode.context;
          // If primaryContext is empty, reset to default
          if (primaryContext && Object.keys(primaryContext).length === 0) {
            primaryContext = pE;
          }
        }
      }
      return [primaryContext, secondaryContext];
    }
    case handleElementProcessing:
    case processHtmlElement:
    case updateBitwiseStateAndEncode: { // Handle element processing node types
      const dependencies = node.dependencies;
      // If dependencies exist and have a firstContext, use isBlobOrFileLikeObject as secondaryContext
      if (dependencies && dependencies.firstContext) {
        secondaryContext = dependencies.firstContext;
      }
      return [primaryContext, secondaryContext];
    }
    default:
      // For unrecognized node types, return null
      return null;
  }
}

module.exports = extractContextPairFromNode;