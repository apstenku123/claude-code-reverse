/**
 * Builds a node (either text or object) from the provided source object, based on its structure.
 *
 * If the source object contains only a text node, builds a text value node.
 * Otherwise, builds an object node with attributes and values.
 *
 * @param {Object} sourceObject - The object to process and build a node from.
 * @param {Object} parentConfig - Configuration or context for node building.
 * @param {number} depth - The current depth or level in the node tree.
 * @returns {any} The constructed node, either as a text value node or an object node.
 */
function buildNodeFromObject(sourceObject, parentConfig, depth) {
  // Extract attributes and value from the source object at the next depth level
  const nodeInfo = this.j2x(sourceObject, depth + 1);

  // Check if the source object is a pure text node (only contains the textNodeName property)
  const isTextNode = (
    sourceObject[this.options.textNodeName] !== undefined &&
    Object.keys(sourceObject).length === 1
  );

  if (isTextNode) {
    // Build and return a text value node
    return this.buildTextValNode(
      sourceObject[this.options.textNodeName],
      parentConfig,
      nodeInfo.attrStr,
      depth
    );
  } else {
    // Build and return an object node
    return this.buildObjectNode(
      nodeInfo.val,
      parentConfig,
      nodeInfo.attrStr,
      depth
    );
  }
}

module.exports = buildNodeFromObject;