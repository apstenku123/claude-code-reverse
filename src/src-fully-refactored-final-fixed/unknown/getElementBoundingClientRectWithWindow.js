/**
 * Returns the result of getElementAndAncestorRects for a given DOM element and its associated window context.
 * If the element is invalid or does not support getBoundingClientRect, returns null.
 *
 * @param {Element} domElement - The DOM element whose bounding client rect is to be retrieved.
 * @returns {any|null} The result of getElementAndAncestorRects(domElement, targetWindow), or null if input is invalid.
 */
function getElementBoundingClientRectWithWindow(domElement) {
  // Validate that domElement exists and supports getBoundingClientRect
  if (!domElement || typeof domElement.getBoundingClientRect !== "function") {
    return null;
  }

  // Use the React DevTools target window if available, otherwise fallback to global window
  const targetWindow = window.__REACT_DEVTOOLS_TARGET_WINDOW__ || window;

  // Call external function getElementAndAncestorRects with the DOM element and the determined window context
  return getElementAndAncestorRects(domElement, targetWindow);
}

module.exports = getElementBoundingClientRectWithWindow;