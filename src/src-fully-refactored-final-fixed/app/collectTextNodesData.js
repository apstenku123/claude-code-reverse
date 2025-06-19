/**
 * Recursively collects the text content from all text nodes within a DOM subtree.
 *
 * @param {Node} currentNode - The DOM node to process. Can be an element or text node.
 * @param {string[]} textContents - An array to which found text node data will be appended.
 * @returns {void}
 *
 * If the current node is a text node, its data is pushed to the textContents array.
 * Otherwise, the function recursively processes all child nodes.
 */
function collectTextNodesData(currentNode, textContents) {
  // Check if the current node is a text node
  if (currentNode.nodeType === xK.TEXT_NODE) {
    // If so, add its data to the results array
    textContents.push(currentNode._data);
  } else {
    // Otherwise, recursively process all child nodes
    for (let childIndex = 0, numChildren = currentNode.childNodes.length; childIndex < numChildren; childIndex++) {
      collectTextNodesData(currentNode.childNodes[childIndex], textContents);
    }
  }
}

module.exports = collectTextNodesData;