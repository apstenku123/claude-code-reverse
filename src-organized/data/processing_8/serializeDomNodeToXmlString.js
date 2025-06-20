/**
 * Serializes a DOM node and its subtree into an XML string representation.
 * Handles namespaces, attributes, and special node types (CDATA, comments, DOCTYPE, etc.).
 *
 * @param {Node} node - The DOM node to serialize.
 * @param {string[]} outputBuffer - Array to which the XML string fragments are pushed.
 * @param {boolean} isHtmlContext - Indicates if the current context is HTML (affects void/self-closing tags).
 * @param {function} nodeTransform - Optional transform function to preprocess nodes before serialization.
 * @param {Array<{prefix: string, namespace: string}>} namespaceStack - Stack tracking current namespace declarations.
 * @returns {void}
 */
function serializeDomNodeToXmlString(
  node,
  outputBuffer,
  isHtmlContext,
  nodeTransform,
  namespaceStack
) {
  if (!namespaceStack) namespaceStack = [];

  // Optionally transform the node before serialization
  if (nodeTransform) {
    node = nodeTransform(node);
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
      let child = node.firstChild;
      const tagName = node.tagName;
      let htmlContext = H11.isHTML(node.namespaceURI) || isHtmlContext;
      let qualifiedTagName = tagName;

      // Namespace prefix resolution for XML serialization
      if (!htmlContext && !node.prefix && node.namespaceURI) {
        let foundNamespace;
        // Check for explicit xmlns attribute
        for (let i = 0; i < attributeCount; i++) {
          if (attributes.item(i).name === "xmlns") {
            foundNamespace = attributes.item(i).value;
            break;
          }
        }
        // Check namespace stack for matching prefix
        if (!foundNamespace) {
          for (let i = namespaceStack.length - 1; i >= 0; i--) {
            const nsEntry = namespaceStack[i];
            if (nsEntry.prefix === "" && nsEntry.namespace === node.namespaceURI) {
              foundNamespace = nsEntry.namespace;
              break;
            }
          }
        }
        // If the namespace URI is not declared, try to find a prefix
        if (foundNamespace !== node.namespaceURI) {
          for (let i = namespaceStack.length - 1; i >= 0; i--) {
            const nsEntry = namespaceStack[i];
            if (nsEntry.namespace === node.namespaceURI) {
              if (nsEntry.prefix) {
                qualifiedTagName = nsEntry.prefix + ":" + tagName;
              }
              break;
            }
          }
        }
      }

      outputBuffer.push("<", qualifiedTagName);

      // Collect namespace declarations from attributes
      for (let i = 0; i < attributeCount; i++) {
        const attr = attributes.item(i);
        if (attr.prefix === "xmlns") {
          namespaceStack.push({ prefix: attr.localName, namespace: attr.value });
        } else if (attr.nodeName === "xmlns") {
          namespaceStack.push({ prefix: "", namespace: attr.value });
        }
      }

      // Serialize attributes and namespace declarations
      for (let i = 0; i < attributeCount; i++) {
        const attr = attributes.item(i);
        if (isNamespaceDeclarationRequired(attr, htmlContext, namespaceStack)) {
          const nsPrefix = attr.prefix || "";
          const nsUri = attr.namespaceURI;
          zt1(outputBuffer, nsPrefix ? "xmlns:" + nsPrefix : "xmlns", nsUri);
          namespaceStack.push({ prefix: nsPrefix, namespace: nsUri });
        }
        serializeDomNodeToXmlString(attr, outputBuffer, htmlContext, nodeTransform, namespaceStack);
      }

      // Serialize element'createInteractionAccessor own namespace if needed
      if (tagName === qualifiedTagName && isNamespaceDeclarationRequired(node, htmlContext, namespaceStack)) {
        const nsPrefix = node.prefix || "";
        const nsUri = node.namespaceURI;
        zt1(outputBuffer, nsPrefix ? "xmlns:" + nsPrefix : "xmlns", nsUri);
        namespaceStack.push({ prefix: nsPrefix, namespace: nsUri });
      }

      // Serialize children or self-close
      if (
        child || (htmlContext && !/^(?:meta|link|img|br|hr|input)$/i.test(tagName))
      ) {
        outputBuffer.push(">");
        if (htmlContext && /^script$/i.test(tagName)) {
          // Special handling for <script> content
          while (child) {
            if (child.data) {
              outputBuffer.push(child.data);
            } else {
              serializeDomNodeToXmlString(child, outputBuffer, htmlContext, nodeTransform, namespaceStack.slice());
            }
            child = child.nextSibling;
          }
        } else {
          while (child) {
            serializeDomNodeToXmlString(child, outputBuffer, htmlContext, nodeTransform, namespaceStack.slice());
            child = child.nextSibling;
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
      let child = node.firstChild;
      while (child) {
        serializeDomNodeToXmlString(child, outputBuffer, isHtmlContext, nodeTransform, namespaceStack.slice());
        child = child.nextSibling;
      }
      return;
    }
    case Iu: // ATTRIBUTE_NODE
      return zt1(outputBuffer, node.name, node.value);
    case SK1: // TEXT_NODE
      return outputBuffer.push(node.data.replace(/[<&>]/g, escapeHtmlCharacter));
    case RE2: // CDATA_SECTION_NODE
      return outputBuffer.push("<![CDATA[", node.data, "]]>" );
    case PE2: // COMMENT_NODE
      return outputBuffer.push("<!--", node.data, "-->");
    case _E2: { // DOCUMENT_TYPE_NODE
      const { publicId, systemId } = node;
      outputBuffer.push("<!DOCTYPE ", node.name);
      if (publicId) {
        outputBuffer.push(" PUBLIC ", publicId);
        if (systemId && systemId !== ".") outputBuffer.push(" ", systemId);
        outputBuffer.push(">" );
      } else if (systemId && systemId !== ".") {
        outputBuffer.push(" SYSTEM ", systemId, ">" );
      } else {
        const internalSubset = node.internalSubset;
        if (internalSubset) outputBuffer.push(" [", internalSubset, "]");
        outputBuffer.push(">" );
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

module.exports = serializeDomNodeToXmlString;