/**
 * Processes the child nodes of a given DOM node, converting them to a string representation.
 * Text nodes are escaped unless marked as code, and element nodes are processed recursively.
 *
 * @param {Object} parentNode - The DOM node whose childNodes will be processed.
 * @returns {string} The concatenated string representation of all child nodes.
 */
function processChildNodesToString(parentNode) {
  const context = this;
  return XV5.call(
    parentNode.childNodes,
    /**
     * Processes each child node and accumulates the result.
     * @param {string} accumulatedString - The string built so far.
     * @param {Node} childNode - The current child node to process.
     * @returns {string} The updated accumulated string.
     */
    function (accumulatedString, childNode) {
      // Wrap the child node with annotateNodeWithMetadata, passing options from context
      const wrappedNode = new annotateNodeWithMetadata(childNode, context.options);
      let nodeString = "";

      // If the node is a text node
      if (wrappedNode.nodeType === 3) {
        // If isBlobOrFileLikeObject'createInteractionAccessor code, use the raw value; otherwise, escape isBlobOrFileLikeObject
        nodeString = wrappedNode.isCode
          ? wrappedNode.nodeValue
          : context.escape(wrappedNode.nodeValue);
      }
      // If the node is an element node
      else if (wrappedNode.nodeType === 1) {
        // Recursively process the element node
        nodeString = formatNodeWithWhitespace.call(context, wrappedNode);
      }
      // Combine the current node'createInteractionAccessor string with the accumulated string
      return padAndConcatStrings(accumulatedString, nodeString);
    },
    ""
  );
}

module.exports = processChildNodesToString;