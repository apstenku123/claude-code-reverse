/**
 * Traverses a DOM subtree and collects start/stop events with offsets for element nodes.
 * Skips self-closing tags (br, hr, img, input) for stop events.
 *
 * @param {Node} rootNode - The root DOM node to start traversal from.
 * @returns {Array<{event: 'start'|'stop', offset: number, node: Node}>} Array of event objects with offsets and nodes.
 */
function collectDomNodeOffsets(rootNode) {
  /**
   * Helper function to determine if a node is self-closing (br, hr, img, input).
   * Assumes JO1 is a function that returns the tag name of a node as a string.
   * @param {Node} node
   * @returns {boolean}
   */
  function isSelfClosingTag(node) {
    // JO1 is assumed to return the tag name as a string
    return /br|hr|img|input/.test(JO1(node));
  }

  /**
   * Recursive function to traverse the DOM tree and collect events.
   * @param {Node} currentNode - The node to process.
   * @param {number} currentOffset - The current text offset.
   * @returns {number} - The updated offset after processing this node and its children.
   */
  function traverseAndCollect(currentNode, currentOffset) {
    for (let childNode = currentNode.firstChild; childNode; childNode = childNode.nextSibling) {
      if (childNode.nodeType === 3) { // Text node
        currentOffset += childNode.nodeValue.length;
      } else if (childNode.nodeType === 1) { // Element node
        // Record the start event for this element node
        events.push({
          event: "start",
          offset: currentOffset,
          node: childNode
        });
        // Recursively process child nodes
        currentOffset = traverseAndCollect(childNode, currentOffset);
        // Only record stop event if not a self-closing tag
        if (!isSelfClosingTag(childNode)) {
          events.push({
            event: "stop",
            offset: currentOffset,
            node: childNode
          });
        }
      }
    }
    return currentOffset;
  }

  const events = [];
  traverseAndCollect(rootNode, 0);
  return events;
}

module.exports = collectDomNodeOffsets;