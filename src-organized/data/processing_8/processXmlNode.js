/**
 * Processes an XML node and returns either a text value node or an object node based on its structure.
 *
 * @param {Object} xmlNode - The XML node object to process.
 * @param {Object} parentConfig - Configuration or context object for node processing.
 * @param {number} nestingLevel - The current depth or nesting level in the XML tree.
 * @returns {any} The processed node, either as a text value node or an object node.
 */
function processXmlNode(xmlNode, parentConfig, nestingLevel) {
  // Extract attributes and value from the XML node at the next nesting level
  const nodeInfo = this.j2x(xmlNode, nestingLevel + 1);

  // Check if the node is a pure text node (only contains the text node name property)
  const textNodeName = this.options.textNodeName;
  const isTextNode = xmlNode[textNodeName] !== undefined && Object.keys(xmlNode).length === 1;

  if (isTextNode) {
    // Build and return a text value node
    return this.buildTextValNode(
      xmlNode[textNodeName],
      parentConfig,
      nodeInfo.attrStr,
      nestingLevel
    );
  } else {
    // Build and return an object node
    return this.buildObjectNode(
      nodeInfo.val,
      parentConfig,
      nodeInfo.attrStr,
      nestingLevel
    );
  }
}

module.exports = processXmlNode;