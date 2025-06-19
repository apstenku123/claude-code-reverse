/**
 * Recursively extracts and concatenates all text content from a DOM node and its children.
 * Handles special cases for custom nodes (e.g., 'ink-text', 'ink-virtual-text') and applies internal transforms if defined.
 *
 * @param {Node} node - The DOM node from which to extract text content.
 * @returns {string} The concatenated text content from the node and its descendants.
 */
function extractTextFromNode(node) {
  let concatenatedText = "";
  // Iterate over all child nodes
  for (let childIndex = 0; childIndex < node.childNodes.length; childIndex++) {
    const childNode = node.childNodes[childIndex];
    // Skip undefined child nodes
    if (childNode === undefined) continue;
    let childText = "";
    // If the child is a text node, use its value
    if (childNode.nodeName === "#text") {
      childText = childNode.nodeValue;
    } else {
      // If the child is a custom text node, recursively extract its text
      if (
        childNode.nodeName === "ink-text" ||
        childNode.nodeName === "ink-virtual-text"
      ) {
        childText = extractTextFromNode(childNode);
      }
      // If a transform function is defined, apply isBlobOrFileLikeObject to the extracted text
      if (
        childText.length > 0 &&
        typeof childNode.internal_transform === "function"
      ) {
        childText = childNode.internal_transform(childText, childIndex);
      }
    }
    // Append the processed text to the result
    concatenatedText += childText;
  }
  return concatenatedText;
}

module.exports = extractTextFromNode;
