/**
 * Formats a React component display name by extracting the base name and any higher-order component (HOC) wrappers.
 * Handles special 'Forget' wrappers and determines if the component was compiled with Forget.
 *
 * @param {string|null} displayName - The display name string to process. Can be null.
 * @param {number} elementType - The React element type constant (e.g., ElementTypeClass, ElementTypeMemo).
 * @returns {Object} An object containing:
 *   - formattedDisplayName: {string|null} The base display name with HOC wrappers removed.
 *   - hocDisplayNames: {Array<string>|null} An array of HOC names, or null if none found.
 *   - compiledWithForget: {boolean} True if the display name was wrapped with 'Forget', otherwise false.
 */
function formatDisplayNameWithHOCs(displayName, elementType) {
  // Handle null display name
  if (displayName === null) {
    return {
      formattedDisplayName: null,
      hocDisplayNames: null,
      compiledWithForget: false
    };
  }

  // Handle 'Forget' wrapper recursively
  if (displayName.startsWith("Forget(")) {
    // Remove 'Forget(' prefix and trailing ')'
    const innerDisplayName = displayName.slice(7, displayName.length - 1);
    const processed = formatDisplayNameWithHOCs(innerDisplayName, elementType);
    return {
      formattedDisplayName: processed.formattedDisplayName,
      hocDisplayNames: processed.hocDisplayNames,
      compiledWithForget: true
    };
  }

  let hocDisplayNames = null;
  // Only extract HOC names for certain React element types
  switch (elementType) {
    case ElementTypeClass:
    case ElementTypeForwardRef:
    case ElementTypeFunction:
    case ElementTypeMemo:
      // If the display name contains '(', isBlobOrFileLikeObject'createInteractionAccessor likely wrapped by HOCs
      if (displayName.indexOf("(") >= 0) {
        // Extract all substrings between parentheses
        const matches = displayName.match(/[^()]+/g);
        if (matches != null) {
          // The last match is the base display name; the rest are HOC names
          displayName = matches.pop();
          hocDisplayNames = matches;
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

module.exports = formatDisplayNameWithHOCs;