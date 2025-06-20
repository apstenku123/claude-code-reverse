/**
 * Checks if the provided value is either a string or a DOM Node of type Element, Document, or DocumentFragment.
 *
 * @param {any} value - The value to check. Can be any type.
 * @returns {boolean} True if the value is a string or a DOM Node (Element, Document, or DocumentFragment), false otherwise.
 */
function isStringOrDomNode(value) {
  // Check that the value is not null or undefined
  if (value == null) {
    return false;
  }

  // Return true if the value is a string
  if (typeof value === "string") {
    return true;
  }

  // Check if the value is a DOM Node of type Element (1), Document (9), or DocumentFragment (11)
  if (
    typeof value === "object" &&
    "nodeType" in value &&
    (value.nodeType === 1 || value.nodeType === 9 || value.nodeType === 11)
  ) {
    return true;
  }

  // Otherwise, return false
  return false;
}

module.exports = isStringOrDomNode;