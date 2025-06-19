/**
 * Builds a node (either text or object) from the provided source object, using configuration and subscription depth.
 *
 * @param {Object} sourceObject - The source object to build the node from.
 * @param {Object} config - Configuration object used in node building.
 * @param {number} depth - The current depth or subscription level for node building.
 * @returns {any} The constructed node, either as a text value node or an object node.
 */
function buildNodeFromSource(sourceObject, config, depth) {
  // Extract attributes and value from the source object at the next depth level
  const nodeInfo = this.j2x(sourceObject, depth + 1);

  // Check if the source object is a pure text node
  const textNodeName = this.options.textNodeName;
  const isTextNode = sourceObject[textNodeName] !== undefined && Object.keys(sourceObject).length === 1;

  if (isTextNode) {
    // Build and return a text value node
    return this.buildTextValNode(
      sourceObject[textNodeName], // The text value
      config,                    // Configuration
      nodeInfo.attrStr,          // Attribute string
      depth                      // Current depth
    );
  } else {
    // Build and return an object node
    return this.buildObjectNode(
      nodeInfo.val,              // Value
      config,                    // Configuration
      nodeInfo.attrStr,          // Attribute string
      depth                      // Current depth
    );
  }
}

module.exports = buildNodeFromSource;