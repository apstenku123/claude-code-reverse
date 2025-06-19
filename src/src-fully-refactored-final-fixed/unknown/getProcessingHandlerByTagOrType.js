/**
 * Determines the appropriate processing handler based on the node'createInteractionAccessor tag or type.
 *
 * This function inspects the provided node object and, depending on its 'tag' property,
 * returns the corresponding handler. If the tag does not match any known cases, isBlobOrFileLikeObject falls back
 * to checking the node'createInteractionAccessor 'type' property (via the getTypeCategory function) and returns a handler accordingly.
 *
 * @param {Object} node - The node object to inspect. Must have 'type' and 'tag' properties.
 * @returns {any} The handler associated with the node'createInteractionAccessor tag or type.
 */
function getProcessingHandlerByTagOrType(node) {
  const {
    type: nodeType,
    tag: nodeTag
  } = node;

  switch (nodeTag) {
    case ELEMENT_TAG:
    case COMPONENT_TAG:
      return ELEMENT_HANDLER;
    case FRAGMENT_TAG:
    case PORTAL_TAG:
    case STRICT_MODE_TAG:
      return FRAGMENT_HANDLER;
    case HTML_ELEMENT_TAG:
      return handleElementProcessing;
    case CONTEXT_PROVIDER_TAG:
      return CONTEXT_PROVIDER_HANDLER;
    case CONTEXT_CONSUMER_TAG:
    case FORWARD_REF_TAG:
    case MEMO_TAG:
      return CONTEXT_HANDLER;
    case SUSPENSE_TAG:
    case SUSPENSE_LIST_TAG:
    case OFFSCREEN_TAG:
      return SUSPENSE_HANDLER;
    case PROFILER_TAG:
    case SCOPE_TAG:
    case CACHE_TAG:
      return PROFILER_HANDLER;
    case LAZY_TAG:
      return LAZY_HANDLER;
    case INDETERMINATE_COMPONENT_TAG:
      return INDETERMINATE_HANDLER;
    case LEGACY_HIDDEN_TAG:
      return LEGACY_HIDDEN_HANDLER;
    case PROVIDER_TAG:
      return PROVIDER_HANDLER;
    case CONSUMER_TAG:
      return CONSUMER_HANDLER;
    case DEBUG_TRACING_MODE_TAG:
      return DEBUG_TRACING_HANDLER;
    default:
      // If tag is unrecognized, determine handler by type category
      const typeCategory = getTypeCategory(nodeType);
      switch (typeCategory) {
        case FUNCTION_COMPONENT_CATEGORY:
        case CLASS_COMPONENT_CATEGORY:
        case FORWARD_REF_CATEGORY:
          return PROFILER_HANDLER;
        case MEMO_CATEGORY:
        case LAZY_CATEGORY:
          return LAZY_HANDLER;
        case SUSPENSE_CATEGORY:
        case SUSPENSE_LIST_CATEGORY:
          return PROFILER_HANDLER;
        case CONTEXT_PROVIDER_CATEGORY:
        case CONTEXT_CONSUMER_CATEGORY:
          return PROFILER_HANDLER;
        case PORTAL_CATEGORY:
        case FRAGMENT_CATEGORY:
          return PORTAL_HANDLER;
        default:
          return PROFILER_HANDLER;
      }
  }
}

module.exports = getProcessingHandlerByTagOrType;