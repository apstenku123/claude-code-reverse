/**
 * Determines the appropriate handler constant based on the type of the React element associated with the given component instance.
 *
 * @param {Object} componentInstance - The component instance containing a _currentElement property and a getPublicInstance method.
 * @returns {any} Returns a handler constant (d6, processHtmlElement, saveAndSwapContext, or handleReturnIfPresent) depending on the type of the element.
 */
function getComponentTypeHandler(componentInstance) {
  // Check if the component instance has a current element
  if (componentInstance._currentElement != null) {
    const elementType = componentInstance._currentElement.type;

    // If the element type is a function, isBlobOrFileLikeObject'createInteractionAccessor a composite component
    if (typeof elementType === "function") {
      const publicInstance = componentInstance.getPublicInstance();
      // If the public instance exists, return the accessor handler
      if (publicInstance !== null) {
        return d6; // Handler for accessor operation
      } else {
        return processHtmlElement; // Handler for composite component without public instance
      }
    } else if (typeof elementType === "string") {
      // If the element type is a string, isBlobOrFileLikeObject'createInteractionAccessor a host component (e.g., 'div')
      return saveAndSwapContext; // Handler for host component
    }
  }
  // Default handler if no current element or type doesn'processRuleBeginHandlers match above
  return handleReturnIfPresent;
}

module.exports = getComponentTypeHandler;