/**
 * Serializes an XML/DOM node and its subtree into a string buffer, handling namespaces and special node types.
 *
 * @param {Node} node - The DOM node to serialize.
 * @param {string[]} outputBuffer - The array buffer to which the serialized XML will be pushed.
 * @param {boolean} isHtmlContext - Whether the current context is HTML (affects void tag handling).
 * @param {function} nodeTransformer - Optional transformer function to preprocess nodes before serialization.
 * @param {Array<{prefix: string, namespace: string}>} namespaceStack - Stack of namespace declarations in scope.
 * @returns {void}
 */
function serializeXmlNode(node, outputBuffer, isHtmlContext, nodeTransformer, namespaceStack) {
  if (!namespaceStack) namespaceStack = [];

  // Optionally transform the node before serialization
  if (nodeTransformer) {
    node = nodeTransformer(node);
    if (!node) return;
    if (typeof node === "string") {
      outputBuffer.push(node);
      return;
    }
  }

  switch (node.nodeType) {
    case jK: { // ELEMENT_NODE
      const attributes = node.attributes;
      const attributeCount = attributes.length;
      let childNode = node.firstChild;
      const tagName = node.tagName;
      let isHtml = H11.isHTML(node.namespaceURI) || isHtmlContext;
      let qualifiedTagName = tagName;

      // Handle namespace prefix for non-HTML elements
      if (!isHtml && !node.prefix && node.namespaceURI) {
        let foundNamespace = undefined;
        // Check for explicit xmlns attribute
        for (let i = 0; i < attributeCount; i++) {
          if (attributes.item(i).name === "xmlns") {
            foundNamespace = attributes.item(i).value;
            break;
          }
        }
        // Check namespace stack for matching default namespace
        if (!foundNamespace) {
          for (let i = namespaceStack.length - 1; i >= 0; i--) {
            const ns = namespaceStack[i];
            if (ns.prefix === "" && ns.namespace === node.namespaceURI) {
              foundNamespace = ns.namespace;
              break;
            }
          }
        }
        // If namespace doesn'processRuleBeginHandlers match, try to find a prefix in the stack
        if (foundNamespace !== node.namespaceURI) {
          for (let i = namespaceStack.length - 1; i >= 0; i--) {
            const ns = namespaceStack[i];
            if (ns.namespace === node.namespaceURI) {
              if (ns.prefix) qualifiedTagName = ns.prefix + ":" + tagName;
              break;
            }
          }
        }
      }

      outputBuffer.push("<", qualifiedTagName);

      // Track new namespace declarations from attributes
      for (let i = 0; i < attributeCount; i++) {
        const attr = attributes.item(i);
        if (attr.prefix === "xmlns") {
          namespaceStack.push({ prefix: attr.localName, namespace: attr.value });
        } else if (attr.nodeName === "xmlns") {
          namespaceStack.push({ prefix: "", namespace: attr.value });
        }
      }

      // Serialize attributes, possibly adding namespace declarations
      for (let i = 0; i < attributeCount; i++) {
        const attr = attributes.item(i);
        if (shouldDeclareNamespace(attr, isHtml, namespaceStack)) {
          const nsPrefix = attr.prefix || "";
          const nsUri = attr.namespaceURI;
          zt1(outputBuffer, nsPrefix ? "xmlns:" + nsPrefix : "xmlns", nsUri);
          namespaceStack.push({ prefix: nsPrefix, namespace: nsUri });
        }
        serializeXmlNode(attr, outputBuffer, isHtml, nodeTransformer, namespaceStack);
      }

      // Declare namespace for the element itself if needed
      if (tagName === qualifiedTagName && shouldDeclareNamespace(node, isHtml, namespaceStack)) {
        const nsPrefix = node.prefix || "";
        const nsUri = node.namespaceURI;
        zt1(outputBuffer, nsPrefix ? "xmlns:" + nsPrefix : "xmlns", nsUri);
        namespaceStack.push({ prefix: nsPrefix, namespace: nsUri });
      }

      // Serialize children or self-close if void
      if (childNode || (isHtml && !/^(?:meta|link|img|br|hr|input)$/i.test(tagName))) {
        outputBuffer.push(">");
        if (isHtml && /^script$/i.test(tagName)) {
          // Special handling for script tags in HTML
          while (childNode) {
            if (childNode.data) {
              outputBuffer.push(childNode.data);
            } else {
              serializeXmlNode(childNode, outputBuffer, isHtml, nodeTransformer, namespaceStack.slice());
            }
            childNode = childNode.nextSibling;
          }
        } else {
          while (childNode) {
            serializeXmlNode(childNode, outputBuffer, isHtml, nodeTransformer, namespaceStack.slice());
            childNode = childNode.nextSibling;
          }
        }
        outputBuffer.push("</", qualifiedTagName, ">");
      } else {
        outputBuffer.push("/>");
      }
      return;
    }
    case SE2: // DOCUMENT_NODE
    case sendHttpRequestOverSocket$: { // DOCUMENT_FRAGMENT_NODE
      let childNode = node.firstChild;
      while (childNode) {
        serializeXmlNode(childNode, outputBuffer, isHtmlContext, nodeTransformer, namespaceStack.slice());
        childNode = childNode.nextSibling;
      }
      return;
    }
    case Iu: // ATTRIBUTE_NODE
      return zt1(outputBuffer, node.name, node.value);
    case SK1: // TEXT_NODE
      return outputBuffer.push(node.data.replace(/[<&>]/g, escapeHtmlCharacter));
    case RE2: // CDATA_SECTION_NODE
      return outputBuffer.push("<![CDATA[", node.data, "]]>");
    case PE2: // COMMENT_NODE
      return outputBuffer.push("<!--", node.data, "-->");
    case _E2: { // DOCUMENT_TYPE_NODE
      const { publicId, systemId } = node;
      outputBuffer.push("<!DOCTYPE ", node.name);
      if (publicId) {
        outputBuffer.push(" PUBLIC ", publicId);
        if (systemId && systemId != ".") outputBuffer.push(" ", systemId);
        outputBuffer.push(">");
      } else if (systemId && systemId != ".") {
        outputBuffer.push(" SYSTEM ", systemId, ">");
      } else {
        const internalSubset = node.internalSubset;
        if (internalSubset) outputBuffer.push(" [", internalSubset, "]");
        outputBuffer.push(">");
      }
      return;
    }
    case TE2: // PROCESSING_INSTRUCTION_NODE
      return outputBuffer.push("<?", node.target, " ", node.data, "?>");
    case OE2: // ENTITY_REFERENCE_NODE
      return outputBuffer.push("&", node.nodeName, ";");
    default:
      outputBuffer.push("??", node.nodeName);
  }
}

module.exports = serializeXmlNode;