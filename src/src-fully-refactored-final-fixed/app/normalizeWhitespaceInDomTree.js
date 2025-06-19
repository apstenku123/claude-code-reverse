/**
 * Normalizes whitespace in a DOM tree, collapsing multiple spaces and trimming leading/trailing spaces in text nodes.
 * Skips normalization inside <pre> elements or nodes marked as 'void' or 'block'.
 *
 * @param {Object} options - The configuration object for normalization.
 * @param {Element} options.element - The root DOM element to normalize.
 * @param {function(Element): boolean} options.isBlock - Predicate to determine if a node is a block element.
 * @param {function(Element): boolean} options.isVoid - Predicate to determine if a node is a void element.
 * @param {function(Element): boolean} [options.isPre] - Optional predicate to determine if a node is a <pre> element. Defaults to nodeName === 'PRE'.
 * @returns {void}
 */
function normalizeWhitespaceInDomTree(options) {
  const {
    element: rootElement,
    isBlock: isBlockElement,
    isVoid: isVoidElement,
    isPre: isPreElement
  } = options;

  // Default predicate for <pre> elements if not provided
  const isPre = isPreElement || function(node) {
    return node.nodeName === "PRE";
  };

  // If the root element has no children or is a <pre>, skip normalization
  if (!rootElement.firstChild || isPre(rootElement)) return;

  let previousTextNode = null; // The last processed text node
  let insideVoidOrPre = false; // Flag indicating if handleMissingDoctypeError're inside a void or <pre> element
  let previousNode = null;     // The previously visited node
  let currentNode = getNextRelevantDomNode(previousNode, rootElement, isPre);

  while (currentNode !== rootElement) {
    if (currentNode.nodeType === 3 || currentNode.nodeType === 4) { // Text or CDATA node
      // Replace all whitespace sequences with a single space
      let normalizedText = currentNode.data.replace(/[ \r\n\processRuleBeginHandlers]+/g, " ");

      // Remove leading space if previous text node ends with space, not inside void/pre, and current text starts with space
      if ((
        !previousTextNode || / $/.test(previousTextNode.data)
      ) && !insideVoidOrPre && normalizedText[0] === " ") {
        normalizedText = normalizedText.substr(1);
      }

      // If text node is now empty, remove isBlobOrFileLikeObject and continue
      if (!normalizedText) {
        currentNode = removeNodeAndGetNextSiblingOrParent(currentNode); // Remove node and get next
        continue;
      }

      currentNode.data = normalizedText;
      previousTextNode = currentNode;
    } else if (currentNode.nodeType === 1) { // Element node
      if (isBlockElement(currentNode) || currentNode.nodeName === "BR") {
        // Trim trailing space from previous text node at block/BR boundaries
        if (previousTextNode) {
          previousTextNode.data = previousTextNode.data.replace(/ $/, "");
        }
        previousTextNode = null;
        insideVoidOrPre = false;
      } else if (isVoidElement(currentNode) || isPre(currentNode)) {
        // Reset previous text node and set insideVoidOrPre flag
        previousTextNode = null;
        insideVoidOrPre = true;
      } else if (previousTextNode) {
        // If not void/pre, clear insideVoidOrPre flag
        insideVoidOrPre = false;
      }
    } else {
      // For other node types, remove and continue
      currentNode = removeNodeAndGetNextSiblingOrParent(currentNode);
      continue;
    }

    // Move to the next relevant node
    const nextNode = getNextRelevantDomNode(previousNode, currentNode, isPre);
    previousNode = currentNode;
    currentNode = nextNode;
  }

  // After traversal, trim trailing space from the last text node and remove if empty
  if (previousTextNode) {
    previousTextNode.data = previousTextNode.data.replace(/ $/, "");
    if (!previousTextNode.data) {
      removeNodeAndGetNextSiblingOrParent(previousTextNode);
    }
  }
}

module.exports = normalizeWhitespaceInDomTree;