/**
 * Determines whether a given element and context combination should be processed as foreign content (MathML or SVG),
 * based on the element type, parent type, and attribute list.
 *
 * @param {string} parentElementType - The type of the parent element (e.g., 'annotation-xml', 'foreignObject', etc.)
 * @param {string} contextType - The context in which the element appears (e.g., 'MATHML', 'SVG')
 * @param {Array<{name: string, value: string}>} attributeList - List of attribute objects for the element
 * @returns {boolean} True if the element should be processed as foreign content, false otherwise
 */
function shouldProcessForeignContent(parentElementType, contextType, attributeList) {
  // Check for MathML annotation-xml with encoding attribute
  if (contextType === yG.MATHML && parentElementType === P9.ANNOTATION_XML) {
    for (let i = 0; i < attributeList.length; i++) {
      const attribute = attributeList[i];
      if (attribute.name === KV1.ENCODING) {
        // Normalize encoding value for comparison
        const encodingValue = attribute.value.toLowerCase();
        // Return true if encoding is 'text/html' or 'application/xml'
        return encodingValue === IV2.TEXT_HTML || encodingValue === IV2.APPLICATION_XML;
      }
    }
  }
  // Check for SVG context with specific parent element types
  return (
    contextType === yG.SVG &&
    (
      parentElementType === P9.FOREIGN_OBJECT ||
      parentElementType === P9.DESC ||
      parentElementType === P9.TITLE
    )
  );
}

module.exports = shouldProcessForeignContent;