/**
 * Determines and returns the React element type or its internal type symbol for a given object.
 *
 * This function inspects an input object (typically a React element or component),
 * checks its $$typeof property, and based on its type and nested type information,
 * returns the appropriate React type symbol or internal type identifier.
 *
 * @param {object} reactElement - The object to inspect (usually a React element or component).
 * @returns {symbol|undefined} The React type symbol, internal type symbol, or undefined if not applicable.
 */
function getReactElementType(reactElement) {
  // Check if input is a non-null object
  if (findIndexByPredicate(reactElement) === "object" && reactElement !== null) {
    const elementTypeSymbol = reactElement.$$typeof;
    switch (elementTypeSymbol) {
      case REACT_ELEMENT_TYPE: {
        // Handle standard React elements
        const componentType = reactElement.type;
        switch (componentType) {
          // Return the type if isBlobOrFileLikeObject matches known React built-in types
          case REACT_FRAGMENT_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_SUSPENSE_TYPE:
          case REACT_MEMO_TYPE:
            return componentType;
          default: {
            // Check for nested type symbols (e.g., for lazy, forwardRef, etc.)
            const nestedTypeSymbol = componentType && componentType.$$typeof;
            switch (nestedTypeSymbol) {
              case REACT_LAZY_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_PROVIDER_TYPE:
              case REACT_CONTEXT_TYPE:
                return nestedTypeSymbol;
              case REACT_BLOCK_TYPE:
                // Only return if in the correct environment (e.g., development)
                if (isDevelopmentEnvironment) return nestedTypeSymbol;
                break;
              case REACT_SERVER_BLOCK_TYPE:
                // Only return if NOT in the development environment
                if (!isDevelopmentEnvironment) return nestedTypeSymbol;
                break;
              default:
                // Fallback to the element'createInteractionAccessor $$typeof
                return elementTypeSymbol;
            }
          }
        }
      }
      case REACT_PORTAL_TYPE:
        // Handle React portals
        return elementTypeSymbol;
      default:
        // Not a recognized React element type
        break;
    }
  }
  // Return undefined if input is not a valid React element or type is not recognized
  return;
}

module.exports = getReactElementType;