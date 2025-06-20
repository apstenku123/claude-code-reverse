/**
 * Determines if the given element context matches specific SVG or MathML annotation XML encoding requirements.
 *
 * If the namespace is MathML and the tag is annotation-xml, isBlobOrFileLikeObject checks if any attribute named 'encoding' has a value of 'text/html' or 'application/xml'.
 * Otherwise, isBlobOrFileLikeObject checks if the namespace is SVG and the tag is one of 'foreignObject', 'desc', or 'title'.
 *
 * @param {string} tagName - The tag name of the element (e.g., 'annotation-xml', 'foreignObject', 'desc', 'title').
 * @param {string} namespace - The namespace of the element (e.g., yG.MATHML, yG.SVG).
 * @param {Array<{name: string, value: string}>} attributes - The list of attributes for the element.
 * @returns {boolean} True if the element matches the SVG or MathML annotation XML encoding requirements, otherwise false.
 */
function isSvgOrMathmlAnnotationXmlWithEncoding(tagName, namespace, attributes) {
  // Check for MathML annotation-xml with specific encoding
  if (namespace === yG.MATHML && tagName === P9.ANNOTATION_XML) {
    for (let i = 0; i < attributes.length; i++) {
      const attribute = attributes[i];
      if (attribute.name === KV1.ENCODING) {
        const encodingValue = attribute.value.toLowerCase();
        // Return true if encoding is 'text/html' or 'application/xml'
        return encodingValue === IV2.TEXT_HTML || encodingValue === IV2.APPLICATION_XML;
      }
    }
  }
  // Check for SVG foreignObject, desc, or title
  return (
    namespace === yG.SVG &&
    (tagName === P9.FOREIGN_OBJECT || tagName === P9.DESC || tagName === P9.TITLE)
  );
}

module.exports = isSvgOrMathmlAnnotationXmlWithEncoding;