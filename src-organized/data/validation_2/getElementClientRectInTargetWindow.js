/**
 * Retrieves the client rectangle of a DOM element within a specific window context.
 *
 * This function checks if the provided element is valid and supports the getBoundingClientRect method.
 * It then determines the appropriate window context (either a React DevTools target window or the global window)
 * and delegates to the getElementAndAncestorRects function to perform the actual rectangle retrieval.
 *
 * @param {Element} domElement - The DOM element whose client rectangle is to be retrieved.
 * @returns {any|null} The result of getElementAndAncestorRects(domElement, targetWindow) if valid, otherwise null.
 */
function getElementClientRectInTargetWindow(domElement) {
  // Ensure the element is valid and supports getBoundingClientRect
  if (!domElement || typeof domElement.getBoundingClientRect !== "function") {
    return null;
  }

  // Use the React DevTools target window if available, otherwise fallback to the global window
  const targetWindow = window.__REACT_DEVTOOLS_TARGET_WINDOW__ || window;

  // Delegate to getElementAndAncestorRects to get the client rectangle or related data
  return getElementAndAncestorRects(domElement, targetWindow);
}

module.exports = getElementClientRectInTargetWindow;