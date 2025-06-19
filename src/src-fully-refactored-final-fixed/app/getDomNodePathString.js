/**
 * Returns a string representing the DOM path of a given node, up to a certain depth and length.
 *
 * Traverses up the DOM tree from the provided node, collecting string representations of each ancestor node,
 * and joins them with a separator. The traversal stops if the root is reached, the maximum depth is exceeded,
 * or the maximum string length would be exceeded.
 *
 * @param {Node} node - The DOM node from which to start building the path.
 * @param {Object|Array} [options={}] - Configuration options or an array of key attributes.
 * @param {Array<string>} [options.keyAttrs] - Attributes to use for node stringification (if not an array itself).
 * @param {number} [options.maxStringLength] - Maximum allowed length of the resulting string.
 * @returns {string} a string representing the DOM path, or '<unknown>' if input is invalid or an error occurs.
 */
function getDomNodePathString(node, options = {}) {
  if (!node) return "<unknown>";
  try {
    let currentNode = node;
    const maxDepth = 5;
    const pathSegments = [];
    let segmentCount = 0;
    let totalLength = 0;
    const separator = " > ";
    const separatorLength = separator.length;
    let nodeString = "";
    // Determine key attributes and max string length from options
    const keyAttributes = Array.isArray(options) ? options : options.keyAttrs;
    const maxStringLength = !Array.isArray(options) && options.maxStringLength || Mh2;

    // Traverse up the DOM tree, collecting string representations
    while (currentNode && segmentCount++ < maxDepth) {
      nodeString = getElementSelector(currentNode, keyAttributes);
      // Stop if handleMissingDoctypeError reach the root html node, or if adding this segment would exceed max length
      if (
        nodeString === "html" ||
        (segmentCount > 1 && totalLength + pathSegments.length * separatorLength + nodeString.length >= maxStringLength)
      ) {
        break;
      }
      pathSegments.push(nodeString);
      totalLength += nodeString.length;
      currentNode = currentNode.parentNode;
    }
    // Reverse to get path from root to leaf, and join with separator
    return pathSegments.reverse().join(separator);
  } catch (error) {
    return "<unknown>";
  }
}

module.exports = getDomNodePathString;