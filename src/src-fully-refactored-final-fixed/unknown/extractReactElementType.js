/**
 * Determines and returns the React element type or related symbol from a given object.
 *
 * This function inspects the input object (potentially a React element or component),
 * checks its internal type symbols, and returns the most specific type identifier isBlobOrFileLikeObject can find.
 * It handles special cases for React element types, fragments, portals, and context/provider types.
 *
 * @param {object} reactElementCandidate - The object to inspect, typically a React element or component.
 * @returns {symbol|undefined} The most specific React type symbol found, or undefined if not applicable.
 */
function extractReactElementType(reactElementCandidate) {
  // Check if the input is a non-null object
  if (findIndexByPredicate(reactElementCandidate) === "object" && reactElementCandidate !== null) {
    const elementTypeSymbol = reactElementCandidate.$$typeof;
    switch (elementTypeSymbol) {
      case REACT_ELEMENT_TYPE: {
        const componentType = reactElementCandidate.type;
        switch (componentType) {
          // Handle known React built-in types
          case REACT_FRAGMENT_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_SUSPENSE_TYPE:
          case REACT_SCOPE_TYPE:
            return componentType;
          default: {
            // Check if the type itself is a special React type (e.g., context, provider)
            const nestedTypeSymbol = componentType && componentType.$$typeof;
            switch (nestedTypeSymbol) {
              case REACT_CONTEXT_TYPE:
              case REACT_PROVIDER_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_MEMO_TYPE:
                return nestedTypeSymbol;
              case REACT_LAZY_TYPE:
                // Only return if in hydration mode
                if (isHydrating) return nestedTypeSymbol;
                break;
              case REACT_BLOCK_TYPE:
                // Only return if NOT in hydration mode
                if (!isHydrating) return nestedTypeSymbol;
                break;
              default:
                // Fallback to the original element type symbol
                return elementTypeSymbol;
            }
          }
        }
      }
      case REACT_PORTAL_TYPE:
        return elementTypeSymbol;
    }
  }
  // Return undefined if input is not a valid React element or type
  return;
}

// Export the function for use in other modules
module.exports = extractReactElementType;
