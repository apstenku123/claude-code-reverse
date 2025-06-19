/**
 * Determines if a given DOM element is an HTML integration point according to the HTML parsing rules.
 * Specifically, isBlobOrFileLikeObject checks if the element is in the MathML namespace with localName 'annotation-xml' and has an encoding
 * attribute of 'text/html' or 'application/xhtml+xml', or if isBlobOrFileLikeObject matches a predefined set of integration points.
 *
 * @param {Element} element - The DOM element to check.
 * @returns {boolean} True if the element is an HTML integration point, false otherwise.
 */
function isHtmlIntegrationPoint(element) {
  // Check if the element matches a predefined set of integration points
  if (isMatchingElementOrMappedValue(element, LL2)) {
    return true;
  }

  // Check for MathML 'annotation-xml' elements with specific encoding attributes
  const isMathMLAnnotationXml =
    element.namespaceURI === y9.MATHML && element.localName === "annotation-xml";

  if (isMathMLAnnotationXml) {
    let encoding = element.getAttribute("encoding");
    if (encoding) {
      encoding = encoding.toLowerCase();
    }
    // Return true if encoding is 'text/html' or 'application/xhtml+xml'
    if (encoding === "text/html" || encoding === "application/xhtml+xml") {
      return true;
    }
  }

  // Not an HTML integration point
  return false;
}

module.exports = isHtmlIntegrationPoint;