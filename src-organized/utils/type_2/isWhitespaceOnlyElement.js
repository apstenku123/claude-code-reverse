/**
 * Determines if a DOM element contains only whitespace text and does not meet certain exclusion criteria.
 *
 * This function checks if the provided DOM element:
 *   - Is not excluded by iL2 (unknown exclusion logic)
 *   - Is not excluded by oC5 (unknown exclusion logic)
 *   - Has textContent that is only whitespace
 *   - Is not excluded by rC5 (unknown exclusion logic)
 *   - Is not excluded by tC5 (unknown exclusion logic)
 *
 * @param {Element} domElement - The DOM element to check.
 * @returns {boolean} True if the element contains only whitespace and passes all exclusion checks; otherwise, false.
 */
function isWhitespaceOnlyElement(domElement) {
  // Exclude if any of the exclusion functions return true
  if (iL2(domElement)) return false;
  if (oC5(domElement)) return false;
  // Check if the text content is only whitespace
  const isWhitespace = /^\s*$/i.test(domElement.textContent);
  if (!isWhitespace) return false;
  if (rC5(domElement)) return false;
  if (tC5(domElement)) return false;
  // All checks passed: element is only whitespace and not excluded
  return true;
}

module.exports = isWhitespaceOnlyElement;