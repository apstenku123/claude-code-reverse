/**
 * Determines the type of a React component instance based on its current element.
 *
 * @param {Object} reactComponentInstance - The React component instance to inspect.
 * @returns {*} Returns d6 if the component is a class/function component with a public instance,
 *             processHtmlElement if isBlobOrFileLikeObject'createInteractionAccessor a class/function component without a public instance,
 *             saveAndSwapContext if isBlobOrFileLikeObject'createInteractionAccessor a host (string) component,
 *             or handleReturnIfPresent if the current element is null or type is unrecognized.
 */
function getComponentInstanceType(reactComponentInstance) {
  // Check if the component has a current element
  if (reactComponentInstance._currentElement != null) {
    const elementType = reactComponentInstance._currentElement.type;

    // If the type is a function, isBlobOrFileLikeObject'createInteractionAccessor a class or function component
    if (typeof elementType === "function") {
      const publicInstance = reactComponentInstance.getPublicInstance();
      // If a public instance exists, return d6; otherwise, return processHtmlElement
      if (publicInstance !== null) {
        return d6;
      } else {
        return processHtmlElement;
      }
    } else if (typeof elementType === "string") {
      // If the type is a string, isBlobOrFileLikeObject'createInteractionAccessor a host component (e.g., 'div', 'span')
      return saveAndSwapContext;
    }
  }
  // If no current element or unrecognized type, return handleReturnIfPresent
  return handleReturnIfPresent;
}

module.exports = getComponentInstanceType;