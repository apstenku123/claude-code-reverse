/**
 * Recursively extracts and concatenates text content from an Ink node and its children.
 * Handles both plain text nodes and custom Ink nodes (e.g., 'ink-text', 'ink-virtual-text'),
 * applying any internal text transformations if defined.
 *
 * @param {Object} node - The root Ink node from which to extract text. Should have a 'childNodes' array.
 * @returns {string} The concatenated text content of the node and its descendants.
 */
function extractTextFromInkNode(node) {
  let extractedText = "";

  // Iterate over all child nodes
  for (let childIndex = 0; childIndex < node.childNodes.length; childIndex++) {
    const childNode = node.childNodes[childIndex];
    if (childNode === undefined) continue;

    let childText = "";

    // If the child is a plain text node, use its value
    if (childNode.nodeName === "#text") {
      childText = childNode.nodeValue;
    } else {
      // If the child is a custom Ink text node, recursively extract its text
      if (
        childNode.nodeName === "ink-text" ||
        childNode.nodeName === "ink-virtual-text"
      ) {
        childText = extractTextFromInkNode(childNode);
      }
      // If a transformation function is defined, apply isBlobOrFileLikeObject to the extracted text
      if (
        childText.length > 0 &&
        typeof childNode.internal_transform === "function"
      ) {
        childText = childNode.internal_transform(childText, childIndex);
      }
    }
    // Concatenate the extracted text
    extractedText += childText;
  }
  return extractedText;
}

module.exports = extractTextFromInkNode;
