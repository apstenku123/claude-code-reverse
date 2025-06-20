/**
 * Parses a React component display name, extracting any Higher-Order Component (HOC) wrappers and detecting if compiled with React Forget.
 *
 * @param {string|null} displayName - The display name of the React component, possibly wrapped by HOCs or Forget().
 * @param {number} elementType - The React element type constant (e.g., ElementTypeClass, ElementTypeForwardRef, etc.).
 * @returns {Object} An object containing:
 *   - formattedDisplayName: The innermost component display name (string or null)
 *   - hocDisplayNames: Array of HOC names wrapping the component, or null if none
 *   - compiledWithForget: Boolean indicating if the component was compiled with React Forget
 */
function parseDisplayNameWithHOCs(displayName, elementType) {
  // Handle null input
  if (displayName === null) {
    return {
      formattedDisplayName: null,
      hocDisplayNames: null,
      compiledWithForget: false
    };
  }

  // Handle React Forget wrapper
  if (displayName.startsWith("Forget(")) {
    // Remove 'Forget(' prefix and trailing ')', then recursively parse
    const innerDisplayName = displayName.slice(7, displayName.length - 1);
    const parsedResult = parseDisplayNameWithHOCs(innerDisplayName, elementType);
    return {
      formattedDisplayName: parsedResult.formattedDisplayName,
      hocDisplayNames: parsedResult.hocDisplayNames,
      compiledWithForget: true
    };
  }

  let hocDisplayNames = null;

  // Only attempt to extract HOC wrappers for supported element types
  switch (elementType) {
    case ElementTypeClass:
    case ElementTypeForwardRef:
    case ElementTypeFunction:
    case ElementTypeMemo:
      // If displayName contains '(', assume HOC pattern: HOC1(HOC2(ComponentName))
      if (displayName.indexOf("(") >= 0) {
        // Extract all non-parenthesis substrings (HOC names and component name)
        const displayNameParts = displayName.match(/[^()]+/g);
        if (displayNameParts != null) {
          // The last part is the innermost component name
          displayName = displayNameParts.pop();
          // The rest are HOC names
          hocDisplayNames = displayNameParts;
        }
      }
      break;
    default:
      // For other element types, do not attempt to extract HOCs
      break;
  }

  return {
    formattedDisplayName: displayName,
    hocDisplayNames: hocDisplayNames,
    compiledWithForget: false
  };
}

module.exports = parseDisplayNameWithHOCs;