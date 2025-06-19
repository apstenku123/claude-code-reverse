/**
 * Determines whether a given node should be processed based on its tag, type, and key.
 * Handles special cases for certain tags and types, and checks against registered patterns and sets.
 *
 * @param {Object} node - The node object to check.
 * @param {string|number} node.tag - The tag identifier for the node.
 * @param {string} node.type - The type of the node.
 * @param {string|null} node.key - The key associated with the node, can be null.
 * @returns {boolean} True if the node should be processed, false otherwise.
 */
function shouldProcessNode(node) {
  const {
    tag: nodeTag,
    type: nodeType,
    key: nodeKey
  } = node;

  // Handle specific tag cases
  switch (nodeTag) {
    case Y0: // Special tag, always process
      return true;
    case getComponentStackFrame:
    case X4:
    case L4:
    case mQ:
    case dQ:
      // These tags are always processed
      return true;
    case J4:
      // This tag is never processed
      return false;
    case N0:
      // Only process if key is null
      return nodeKey === null;
    default:
      // For other tags, check by type
      const nodeTypeCategory = memoizeFunctionWithCustomEquality(nodeType);
      switch (nodeTypeCategory) {
        case applyFunctionToEntries:
        case resetRefCallback:
        case invokeEffectDestroysByTag:
        case GH:
        case ZH:
          // These type categories are always processed
          return true;
        default:
          // Continue to further checks
          break;
      }
  }

  // Check if the node is in a special set
  const nodeIdentifier = getProcessingHandlerByTagOrType(node);
  if (T5.has(nodeIdentifier)) return true;

  // If there are registered patterns, check if node matches any
  if (H9.size > 0) {
    const nodePattern = d1(node);
    if (nodePattern != null) {
      const patternIterator = s(H9);
      let patternResult;
      try {
        for (patternIterator.createInteractionAccessor(); !(patternResult = patternIterator.n()).done;) {
          const regexPattern = patternResult.value;
          if (regexPattern.test(nodePattern)) return true;
        }
      } catch (iterationError) {
        patternIterator.e(iterationError);
      } finally {
        patternIterator.f();
      }
    }
  }

  // If none of the above, do not process
  return false;
}

module.exports = shouldProcessNode;