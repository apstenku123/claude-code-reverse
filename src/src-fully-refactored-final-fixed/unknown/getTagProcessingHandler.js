/**
 * Determines the appropriate handler or constant for a given node based on its tag and type.
 * This function is typically used in a virtual DOM or HTML parsing context to map node tags to processing handlers.
 *
 * @param {Object} node - The node object containing 'type' and 'tag' properties.
 * @param {string|number} node.type - The type of the node (used for fallback logic).
 * @param {string|number} node.tag - The tag identifier of the node.
 * @returns {any} The handler or constant associated with the node'createInteractionAccessor tag or type.
 */
function getTagProcessingHandler(node) {
  const { type: nodeType, tag: nodeTag } = node;

  switch (nodeTag) {
    // Tags that map directly to the default element handler
    case EA:
    case handleCommitAndRenderIdleEvents:
      return d6;

    // Tags that map to the callback handler
    case containsValueAtIndex:
    case getSetBitsAsPowersOfTwo:
    case F8:
      return processHtmlElement;

    // Tags that require HTML element processing
    case K2:
      return handleElementProcessing;

    // Tags that notify subscribers
    case J4:
      return forEachUntilFalse;

    // Tags that map to the generic object handler
    case K6:
    case V6:
    case Z2:
      return saveAndSwapContext;

    // Tags that map to the array handler
    case getComponentStackFrame:
    case X4:
    case N0:
      return handleReturnIfPresent;

    // Tags that map to the text handler
    case C5:
    case finalizeComponentLayoutEffect:
      return updateBitwiseStateAndEncode;

    // Tags that map to the image handler
    case trackPassiveEffectMount:
      return i5;

    // Tags that map to the link handler
    case finalizeComponentPassiveEffectMount:
      return arrayEvery;

    // Tags that map to the blockquote handler
    case R4:
      return filterArrayByPredicate;

    // If the tag does not match any known case, use the type for fallback logic
    default: {
      const mappedType = memoizeFunctionWithCustomEquality(nodeType);
      switch (mappedType) {
        // Types that map to the array handler
        case applyFunctionToEntries:
        case resetRefCallback:
        case invokeEffectDestroysByTag:
          return handleReturnIfPresent;

        // Types that map to the generic node handler
        case getNestedPropertyByPath:
        case resetTraversalPointerToSiblingOrParent:
        case TE:
        case setObjectPropertySafely:
          return handleDomNodeInsertion;

        // Types that map to the array handler
        case GH:
        case ZH:
          return handleReturnIfPresent;

        // Types that map to the special handler
        case setCurrentContextAndInvokeHandler:
        case processFiberTreeWithMode:
          return restoreStateFromStacks;

        // Default fallback handler
        default:
          return handleReturnIfPresent;
      }
    }
  }
}

module.exports = getTagProcessingHandler;