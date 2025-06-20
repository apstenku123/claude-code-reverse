/**
 * Recursively collects the text content from all TEXT_NODE descendants of a given DOM node.
 *
 * @param {Node} domNode - The root DOM node to traverse.
 * @param {string[]} textContents - The array to which found text node data will be pushed.
 * @returns {void}
 *
 * If the provided node is a TEXT_NODE, its data is pushed to the textContents array.
 * Otherwise, the function recursively traverses all child nodes.
 */
function collectTextNodeData(domNode, textContents) {
  // Check if the current node is a text node
  if (domNode.nodeType === xK.TEXT_NODE) {
    // Push the text data to the array
    textContents.push(domNode._data);
  } else {
    // Recursively process each child node
    for (let childIndex = 0, numChildren = domNode.childNodes.length; childIndex < numChildren; childIndex++) {
      collectTextNodeData(domNode.childNodes[childIndex], textContents);
    }
  }
}

module.exports = collectTextNodeData;