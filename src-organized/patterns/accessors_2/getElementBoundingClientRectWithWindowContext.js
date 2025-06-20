/**
 * Retrieves the bounding client rectangle of a given DOM element,
 * using a specific window context (such as a React DevTools target window if available).
 *
 * @param {Element} domElement - The DOM element whose bounding rectangle is to be retrieved.
 * @returns {any|null} The result of getElementAndAncestorRects(domElement, targetWindow), or null if the element is invalid.
 */
function getElementBoundingClientRectWithWindowContext(domElement) {
  // Validate that the provided element exists and has the required method
  if (!domElement || typeof domElement.getBoundingClientRect !== "function") {
    return null;
  }

  // Use the React DevTools target window if available, otherwise default to the global window
  const targetWindow = window.__REACT_DEVTOOLS_TARGET_WINDOW__ || window;

  // Delegate to getElementAndAncestorRects, which likely computes the bounding rect in the given window context
  return getElementAndAncestorRects(domElement, targetWindow);
}

module.exports = getElementBoundingClientRectWithWindowContext;