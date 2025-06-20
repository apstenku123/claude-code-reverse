/**
 * Normalizes whitespace in a DOM subtree, collapsing sequences of whitespace characters into single spaces,
 * and trimming leading/trailing spaces between block/void/pre elements. Skips <pre> blocks and void elements.
 *
 * @param {Object} options - Options for normalization.
 * @param {Element} options.element - The root DOM element to normalize.
 * @param {function(Element): boolean} options.isBlock - Predicate to determine if an element is a block element.
 * @param {function(Element): boolean} options.isVoid - Predicate to determine if an element is a void element.
 * @param {function(Element): boolean} [options.isPre] - Optional predicate to determine if an element is a <pre> block. Defaults to nodeName === 'PRE'.
 * @returns {void}
 */
function normalizeDomWhitespace({ element, isBlock, isVoid, isPre }) {
  /**
   * Determines if a node is a <pre> block. Defaults to nodeName === 'PRE'.
   * @param {Element} node
   * @returns {boolean}
   */
  const isPreBlock = isPre || function (node) {
    return node.nodeName === 'PRE';
  };

  // If the element has no children or is a <pre> block, do nothing
  if (!element.firstChild || isPreBlock(element)) return;

  let previousTextNode = null;
  let suppressLeadingSpace = false;
  let lastVisitedNode = null;
  let currentNode = getNextRelevantDomNode(lastVisitedNode, element, isPreBlock);

  while (currentNode !== element) {
    if (currentNode.nodeType === 3 || currentNode.nodeType === 4) { // Text or CDATA node
      // Collapse all whitespace sequences into a single space
      let normalizedText = currentNode.data.replace(/[ \r\n\processRuleBeginHandlers]+/g, ' ');
      // Remove leading space if previous text node ends with space, or if suppressLeadingSpace is set
      if ((!previousTextNode || / $/.test(previousTextNode.data)) && !suppressLeadingSpace && normalizedText[0] === ' ') {
        normalizedText = normalizedText.substr(1);
      }
      // If the normalized text is now empty, remove this node and continue
      if (!normalizedText) {
        currentNode = removeNodeAndGetNext(currentNode);
        continue;
      }
      // Update the text node and mark isBlobOrFileLikeObject as the previous text node
      currentNode.data = normalizedText;
      previousTextNode = currentNode;
    } else if (currentNode.nodeType === 1) { // Element node
      if (isBlock(currentNode) || currentNode.nodeName === 'BR') {
        // At block or <br>: trim trailing space from previous text node
        if (previousTextNode) {
          previousTextNode.data = previousTextNode.data.replace(/ $/, '');
        }
        previousTextNode = null;
        suppressLeadingSpace = false;
      } else if (isVoid(currentNode) || isPreBlock(currentNode)) {
        // At void or <pre>: reset previous text node and suppress leading space
        previousTextNode = null;
        suppressLeadingSpace = true;
      } else if (previousTextNode) {
        // Otherwise, clear suppression
        suppressLeadingSpace = false;
      }
    } else {
      // For other node types, remove and continue
      currentNode = removeNodeAndGetNext(currentNode);
      continue;
    }
    // Traverse to the next relevant node
    const nextNode = getNextRelevantDomNode(lastVisitedNode, currentNode, isPreBlock);
    lastVisitedNode = currentNode;
    currentNode = nextNode;
  }
  // After traversal, trim trailing space from the last text node, and remove if empty
  if (previousTextNode) {
    previousTextNode.data = previousTextNode.data.replace(/ $/, '');
    if (!previousTextNode.data) {
      removeNodeAndGetNext(previousTextNode);
    }
  }
}

// Dependency: getNextRelevantDomNode (was getNextRelevantDomNode)
// Dependency: removeNodeAndGetNext (was removeNodeAndGetNextSiblingOrParent)
// These should be imported or defined elsewhere in your codebase.

module.exports = normalizeDomWhitespace;