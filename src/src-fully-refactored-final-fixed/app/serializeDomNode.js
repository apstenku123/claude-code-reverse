/**
 * Serializes a DOM node and its children into an HTML/XML string representation.
 * Handles elements, text, comments, processing instructions, and doctypes.
 *
 * @param {Node} node - The DOM node to serialize.
 * @param {Node} parentNode - The parent node, used for context (e.g., HTML tag context for text nodes).
 * @returns {string} The serialized string representation of the node.
 */
function serializeDomNode(node, parentNode) {
  let serialized = "";
  switch (node.nodeType) {
    case 1: { // ELEMENT_NODE
      const namespace = node.namespaceURI;
      const isHtml = namespace === Ak.HTML;
      // Use localName for HTML/SVG/MathML, otherwise tagName
      const tagName = (isHtml || namespace === Ak.SVG || namespace === Ak.MATHML)
        ? node.localName
        : node.tagName;
      serialized += `<${tagName}`;
      // Serialize attributes
      for (let attrIndex = 0, attrCount = node._numattrs; attrIndex < attrCount; attrIndex++) {
        const attr = node._attr(attrIndex);
        serialized += ` ${getQualifiedAttributeName(attr)}`;
        if (attr.value !== undefined) {
          serialized += `=\"${escapeHtmlEntities(attr.value)}\"`;
        }
      }
      serialized += ">";
      // If not a void HTML element, serialize children/content
      if (!(isHtml && NJ5[tagName])) {
        let childContent = node.serialize();
        // Optionally transform content for certain tags
        if (invokeHandlerWithArguments$2[tagName.toUpperCase()]) {
          childContent = replaceClosingTagWithEntity(childContent, tagName);
        }
        // Add leading newline for certain HTML tags if required
        if (isHtml && $J5[tagName] && childContent.charAt(0) === '\n') {
          serialized += '\n';
        }
        serialized += childContent;
        serialized += `</${tagName}>`;
      }
      break;
    }
    case 3: // TEXT_NODE
    case 4: { // CDATA_SECTION_NODE
      // Determine parent tag context for text escaping
      let parentTag = "";
      if (parentNode.nodeType === 1 && parentNode.namespaceURI === Ak.HTML) {
        parentTag = parentNode.tagName;
      }
      // If tag allows raw text, output as-is, otherwise escape
      if (invokeHandlerWithArguments$2[parentTag] || (parentTag === "NOSCRIPT" && parentNode.ownerDocument._scripting_enabled)) {
        serialized += node.data;
      } else {
        serialized += escapeHtmlEntities(node.data);
      }
      break;
    }
    case 8: // COMMENT_NODE
      serialized += `<!--${escapeGtInCommentEndings(node.data)}-->`;
      break;
    case 7: { // PROCESSING_INSTRUCTION_NODE
      const processedData = escapeGreaterThanSymbol(node.data);
      serialized += `<?${node.target} ${processedData}?>`;
      break;
    }
    case 10: // DOCUMENT_TYPE_NODE
      serialized += `<!DOCTYPE ${node.name}>`;
      break;
    default:
      a$2.InvalidStateError();
  }
  return serialized;
}

module.exports = serializeDomNode;