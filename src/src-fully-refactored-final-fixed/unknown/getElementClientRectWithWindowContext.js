/**
 * Retrieves the client rectangle of a DOM element using a specific window context.
 *
 * @param {Element} domElement - The DOM element whose bounding client rect is to be retrieved.
 * @returns {any|null} The result of getElementAndAncestorRects(domElement, targetWindow) or null if the element is invalid.
 */
function getElementClientRectWithWindowContext(domElement) {
  // Validate that the input is a DOM element with getBoundingClientRect method
  if (!domElement || typeof domElement.getBoundingClientRect !== "function") {
    return null;
  }

  // Use the React DevTools target window if available, otherwise default to the global window
  const targetWindow = window.__REACT_DEVTOOLS_TARGET_WINDOW__ || window;

  // Delegate to getElementAndAncestorRects to get the client rect in the context of the target window
  return getElementAndAncestorRects(domElement, targetWindow);
}

module.exports = getElementClientRectWithWindowContext;