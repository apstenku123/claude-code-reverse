/**
 * Checks if the given DOM element is a <pre> or <code> element.
 *
 * @param {Element} domElement - The DOM element to check.
 * @returns {boolean} True if the element is a PRE or CODE element, false otherwise.
 */
function isPreOrCodeElement(domElement) {
  // Compare nodeName to 'PRE' and 'CODE' (case-sensitive, as per DOM spec)
  return domElement.nodeName === "PRE" || domElement.nodeName === "CODE";
}

module.exports = isPreOrCodeElement;