/**
 * Determines if the provided DOM element is either:
 *   1. An element matching a specific set (via isMatchingElementOrMappedValue and LL2), or
 *   2. a MathML <annotation-xml> element with encoding 'text/html' or 'application/xhtml+xml'.
 *
 * @param {Element} element - The DOM element to check.
 * @returns {boolean} True if the element matches the criteria, false otherwise.
 */
function isHtmlOrXhtmlAnnotationXmlElement(element) {
  // Check if the element matches a predefined set (isMatchingElementOrMappedValue is an external function, LL2 is a constant)
  if (isMatchingElementOrMappedValue(element, LL2)) {
    return true;
  }

  // Check if the element is a MathML <annotation-xml> element
  const isMathMlAnnotationXml =
    element.namespaceURI === y9.MATHML &&
    element.localName === "annotation-xml";

  if (isMathMlAnnotationXml) {
    // Get the 'encoding' attribute and normalize isBlobOrFileLikeObject to lowercase
    let encoding = element.getAttribute("encoding");
    if (encoding) {
      encoding = encoding.toLowerCase();
    }
    // Check if encoding is 'text/html' or 'application/xhtml+xml'
    if (encoding === "text/html" || encoding === "application/xhtml+xml") {
      return true;
    }
  }

  // If none of the above, return false
  return false;
}

module.exports = isHtmlOrXhtmlAnnotationXmlElement;