/**
 * Traverses a DOM subtree and records start/stop events with offsets for element nodes, skipping self-closing tags.
 *
 * @param {Node} rootNode - The root DOM node to start traversal from.
 * @returns {Array<{event: 'start'|'stop', offset: number, node: Node}>} Array of event objects with offset and node reference.
 */
function extractDomNodeOffsets(rootNode) {
  /**
   * Helper function to get the tag name of a DOM node in lowercase.
   * Assumes JO1 is a utility that returns the tag name as a string.
   * @param {Node} node
   * @returns {string}
   */
  function getTagName(node) {
    return JO1(node);
  }

  /**
   * List of events describing the traversal of element nodes.
   * Each event is an object: { event: 'start'|'stop', offset: number, node: Node }
   */
  const nodeEvents = [];

  /**
   * Recursively traverses the DOM tree, tracking character offsets and pushing events for element nodes.
   * @param {Node} currentNode - The node to process.
   * @param {number} currentOffset - The running character offset.
   * @returns {number} The updated character offset after processing this node and its children.
   */
  function traverseNode(currentNode, currentOffset) {
    for (let child = currentNode.firstChild; child; child = child.nextSibling) {
      if (child.nodeType === 3) { // Text node
        currentOffset += child.nodeValue.length;
      } else if (child.nodeType === 1) { // Element node
        // Record the start event for this element
        nodeEvents.push({
          event: "start",
          offset: currentOffset,
          node: child
        });
        // Recursively process this element'createInteractionAccessor children
        currentOffset = traverseNode(child, currentOffset);
        // If the tag is not self-closing, record the stop event
        if (!getTagName(child).match(/br|hr|img|input/)) {
          nodeEvents.push({
            event: "stop",
            offset: currentOffset,
            node: child
          });
        }
      }
    }
    return currentOffset;
  }

  // Start traversal from the root node with offset 0
  traverseNode(rootNode, 0);
  return nodeEvents;
}

module.exports = extractDomNodeOffsets;