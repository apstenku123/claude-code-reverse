/**
 * Determines and returns the appropriate handler or constant based on the node'createInteractionAccessor tag and type.
 * This function is typically used to map a node'createInteractionAccessor tag (and, if necessary, its type) to a specific handler function or constant.
 *
 * @param {Object} node - The node object containing at least 'type' and 'tag' properties.
 * @returns {*} - The handler function or constant associated with the node'createInteractionAccessor tag/type.
 */
function getHandlerByNodeType(node) {
  const {
    type: nodeType,
    tag: nodeTag
  } = node;

  switch (nodeTag) {
    // Handle accessor operations
    case areArraysEqual:
    case handleCommitAndRenderIdleEvents:
      return handleAccessorOperation;

    // Handle callback batch
    case containsValueAtIndex:
    case getSetBitsAsPowersOfTwo:
    case F8:
      return processHtmlElement;

    // Handle element processing
    case K2:
      return handleElementProcessing;

    // Notify subscribers
    case notifySubscribers:
      return forEachUntilFalse;

    // Handle observable types
    case K6:
    case V6:
    case Z2:
      return saveAndSwapContext;

    // Handle query selectors
    case getComponentStackFrame:
    case X4:
    case N0:
      return handleReturnIfPresent;

    // Handle transformation selectors
    case C5:
    case finalizeComponentLayoutEffect:
      return updateBitwiseStateAndEncode;

    // Handle right-to-left iteration
    case trackPassiveEffectMount:
      return iterateRightUntilFalse;

    // Handle property transformation
    case finalizeComponentPassiveEffectMount:
      return arrayEvery;

    // Handle batch queue
    case R4:
      return filterArrayByPredicate;

    default: {
      // If tag is not recognized, determine handler by node type
      const handlerType = memoizeFunctionWithCustomEquality(nodeType);
      switch (handlerType) {
        case applyFunctionToEntries:
        case resetRefCallback:
        case invokeEffectDestroysByTag:
          return handleReturnIfPresent;
        case getNestedPropertyByPath:
        case resetTraversalPointerToSiblingOrParent:
        case TE:
        case setObjectPropertySafely:
          return handleDomNodeInsertion;
        case GH:
        case ZH:
          return handleReturnIfPresent;
        case setCurrentContextAndInvokeHandler:
        case processFiberTreeWithMode:
          return restoreStateFromStacks;
        default:
          return handleReturnIfPresent;
      }
    }
  }
}

module.exports = getHandlerByNodeType;