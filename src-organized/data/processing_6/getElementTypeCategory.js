/**
 * Determines the category of a React element'createInteractionAccessor type and returns a corresponding constant.
 *
 * @param {Object} reactInstance - The React component instance to inspect.
 * @returns {*} - Returns one of the constants: d6, processHtmlElement, saveAndSwapContext, or handleReturnIfPresent, depending on the element type.
 */
function getElementTypeCategory(reactInstance) {
  // Check if the instance has a current element
  if (reactInstance._currentElement != null) {
    const elementType = reactInstance._currentElement.type;

    // If the type is a function, isBlobOrFileLikeObject'createInteractionAccessor a composite component
    if (typeof elementType === "function") {
      const publicInstance = reactInstance.getPublicInstance();
      // If the public instance exists, return d6; otherwise, return processHtmlElement
      if (publicInstance !== null) {
        return d6;
      } else {
        return processHtmlElement;
      }
    }
    // If the type is a string, isBlobOrFileLikeObject'createInteractionAccessor a host component (e.g., 'div', 'span')
    else if (typeof elementType === "string") {
      return saveAndSwapContext;
    }
  }
  // If none of the above, return handleReturnIfPresent as a default
  return handleReturnIfPresent;
}

module.exports = getElementTypeCategory;