/**
 * Recursively extracts all text content from a DOM node and its descendants.
 *
 * @param {Node} domNode - The DOM node to extract text from.
 * @param {string[]} textContents - The array to accumulate extracted text content.
 * @returns {void}
 *
 * If the node is a text node, its text content is pushed to the array.
 * Otherwise, the function recursively processes all child nodes.
 */
function extractTextFromDomNode(domNode, textContents) {
  // Check if the current node is a text node
  if (domNode.nodeType === xK.TEXT_NODE) {
    // Push the text content to the accumulator array
    textContents.push(domNode._data);
  } else {
    // Recursively process all child nodes
    for (let childIndex = 0, childCount = domNode.childNodes.length; childIndex < childCount; childIndex++) {
      extractTextFromDomNode(domNode.childNodes[childIndex], textContents);
    }
  }
}

module.exports = extractTextFromDomNode;