/**
 * Parses a React component display name to extract the formatted display name, any higher-order component (HOC) wrappers, and whether isBlobOrFileLikeObject was compiled with React Forget.
 *
 * @param {string|null} displayName - The display name of the component, possibly wrapped by HOCs or React Forget.
 * @param {string} elementType - The type of the React element (e.g., ElementTypeClass, ElementTypeFunction, etc.).
 * @returns {{
 *   formattedDisplayName: string|null,
 *   hocDisplayNames: string[]|null,
 *   compiledWithForget: boolean
 * }} An object containing the parsed display name, an array of HOC names (if any), and a flag indicating if compiled with React Forget.
 */
function parseDisplayNameAndHOCs(displayName, elementType) {
  // Handle null displayName
  if (displayName === null) {
    return {
      formattedDisplayName: null,
      hocDisplayNames: null,
      compiledWithForget: false
    };
  }

  // Handle React Forget wrapper
  if (displayName.startsWith("Forget(")) {
    // Extract the inner display name by removing 'Forget(' and the trailing ')'
    const innerDisplayName = displayName.slice(7, displayName.length - 1);
    // Recursively parse the inner display name
    const parsedInner = parseDisplayNameAndHOCs(innerDisplayName, elementType);
    return {
      formattedDisplayName: parsedInner.formattedDisplayName,
      hocDisplayNames: parsedInner.hocDisplayNames,
      compiledWithForget: true
    };
  }

  let hocDisplayNames = null;
  switch (elementType) {
    case ElementTypeClass:
    case ElementTypeForwardRef:
    case ElementTypeFunction:
    case ElementTypeMemo:
      // If the display name includes HOC wrappers (e.g., 'withRouter(MyComponent)')
      if (displayName.indexOf("(") >= 0) {
        // Extract all names between parentheses
        const matchedNames = displayName.match(/[^()]+/g);
        if (matchedNames != null) {
          // The innermost component name is the last one
          displayName = matchedNames.pop();
          // The rest are HOC display names
          hocDisplayNames = matchedNames;
        }
      }
      break;
    default:
      // For other element types, do nothing
      break;
  }

  return {
    formattedDisplayName: displayName,
    hocDisplayNames: hocDisplayNames,
    compiledWithForget: false
  };
}

module.exports = parseDisplayNameAndHOCs;