/**
 * Selects and returns the first DOM element within the `xy.document` that matches the provided CSS selector.
 *
 * @param {string} cssSelector - The CSS selector string used to query the element.
 * @returns {Element|null} The first matching DOM element, or null if not found or if `xy.document`/`querySelector` is unavailable.
 */
function selectElementFromXyDocument(cssSelector) {
  // Ensure xy.document and its querySelector method are available
  if (xy.document && typeof xy.document.querySelector === 'function') {
    return xy.document.querySelector(cssSelector);
  }
  // Return null if xy.document or querySelector is not available
  return null;
}

module.exports = selectElementFromXyDocument;