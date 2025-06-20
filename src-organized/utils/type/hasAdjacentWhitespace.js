/**
 * Determines if there is whitespace adjacent to a given DOM node, either to its left or right.
 *
 * @param {"left"|"right"} direction - The direction to check for adjacent whitespace ("left" or "right").
 * @param {Node} referenceNode - The DOM node to check adjacency from.
 * @param {Object} options - Additional options, such as preformattedCode flag.
 * @param {boolean} options.preformattedCode - If true, skips whitespace check for adjacent <CODE> elements.
 * @returns {boolean|undefined} True if there is adjacent whitespace in the specified direction, false otherwise. Returns undefined if there is no adjacent node.
 */
function hasAdjacentWhitespace(direction, referenceNode, options) {
  let adjacentNode;
  let whitespaceRegex;
  let hasWhitespace;

  // Determine which sibling to check and the appropriate whitespace regex
  if (direction === "left") {
    adjacentNode = referenceNode.previousSibling;
    whitespaceRegex = / $/; // Checks for whitespace at the end
  } else {
    adjacentNode = referenceNode.nextSibling;
    whitespaceRegex = /^ /; // Checks for whitespace at the start
  }

  if (adjacentNode) {
    if (adjacentNode.nodeType === 3) { // Text node
      hasWhitespace = whitespaceRegex.test(adjacentNode.nodeValue);
    } else if (options.preformattedCode && adjacentNode.nodeName === "CODE") {
      // If preformattedCode is true and the adjacent node is a <CODE> element, skip whitespace check
      hasWhitespace = false;
    } else if (adjacentNode.nodeType === 1 && !H1A(adjacentNode)) {
      // If isBlobOrFileLikeObject'createInteractionAccessor an element node and not handled by H1A, check its text content
      hasWhitespace = whitespaceRegex.test(adjacentNode.textContent);
    }
  }

  return hasWhitespace;
}

module.exports = hasAdjacentWhitespace;