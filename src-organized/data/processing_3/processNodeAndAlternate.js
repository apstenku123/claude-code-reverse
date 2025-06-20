/**
 * Processes a node and, if isBlobOrFileLikeObject exists, its alternate node using the provided handler.
 *
 * @param {Object} node - The primary node to process. Should have an optional 'alternate' property.
 * @param {any} handler - The handler or context to be passed to the processing function.
 * @returns {void}
 */
function processNodeAndAlternate(node, handler) {
  // Process the primary node
  extractIterableElements(node, handler);
  // If the node has an alternate, process isBlobOrFileLikeObject as well
  if (node.alternate) {
    extractIterableElements(node.alternate, handler);
  }
}

module.exports = processNodeAndAlternate;
