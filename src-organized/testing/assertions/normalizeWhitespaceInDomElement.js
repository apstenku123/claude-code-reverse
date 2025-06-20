/**
 * Normalizes whitespace in the text nodes of a DOM element, except inside <pre> or void elements.
 * Collapses multiple spaces, tabs, and newlines into a single space, trims leading/trailing spaces,
 * and removes empty text nodes. Skips processing for <pre> blocks and void elements.
 *
 * @param {Object} options - Configuration object for normalization.
 * @param {Element} options.element - The root DOM element to normalize.
 * @param {function(Element): boolean} options.isBlock - Predicate to determine if an element is a block element.
 * @param {function(Element): boolean} options.isVoid - Predicate to determine if an element is a void element.
 * @param {function(Element): boolean} [options.isPre] - Optional predicate to determine if an element is a <pre> block. Defaults to nodeName === 'PRE'.
 * @returns {void}
 */
function normalizeWhitespaceInDomElement({
  element,
  isBlock,
  isVoid,
  isPre = (node) => node.nodeName === "PRE"
}) {
  // If there are no children or this is a <pre> block, skip normalization
  if (!element.firstChild || isPre(element)) return;

  let previousTextNode = null; // Tracks the previous text node for whitespace trimming
  let shouldTrimLeadingSpace = false; // Indicates if leading space should be trimmed from the next text node
  let lastVisitedNode = null; // Used for traversal
  let currentNode = getNextRelevantDomNode(lastVisitedNode, element, isPre);

  while (currentNode !== element) {
    if (currentNode.nodeType === Node.TEXT_NODE || currentNode.nodeType === Node.CDATA_SECTION_NODE) {
      // Normalize whitespace: collapse sequences of whitespace into a single space
      let normalizedText = currentNode.data.replace(/[ \r\n\processRuleBeginHandlers]+/g, " ");

      // If previous text node ends with space or handleMissingDoctypeError just trimmed, remove leading space
      if ((
        !previousTextNode || / $/.test(previousTextNode.data)
      ) && !shouldTrimLeadingSpace && normalizedText[0] === " ") {
        normalizedText = normalizedText.substr(1);
      }

      // If the normalized text is empty, remove this node and continue
      if (!normalizedText) {
        currentNode = removeAndGetNext(currentNode);
        continue;
      }

      // Update the text node with normalized text
      currentNode.data = normalizedText;
      previousTextNode = currentNode;
    } else if (currentNode.nodeType === Node.ELEMENT_NODE) {
      if (isBlock(currentNode) || currentNode.nodeName === "BR") {
        // For block elements or <br>, trim trailing space from previous text node
        if (previousTextNode) {
          previousTextNode.data = previousTextNode.data.replace(/ $/, "");
        }
        previousTextNode = null;
        shouldTrimLeadingSpace = false;
      } else if (isVoid(currentNode) || isPre(currentNode)) {
        // For void elements or <pre>, reset previous text node and set flag to trim leading space
        previousTextNode = null;
        shouldTrimLeadingSpace = true;
      } else if (previousTextNode) {
        // For other elements, clear the trim flag
        shouldTrimLeadingSpace = false;
      }
    } else {
      // For other node types, remove and continue
      currentNode = removeAndGetNext(currentNode);
      continue;
    }

    // Traverse to the next relevant node
    const nextNode = getNextRelevantDomNode(lastVisitedNode, currentNode, isPre);
    lastVisitedNode = currentNode;
    currentNode = nextNode;
  }

  // After traversal, trim trailing space from the last text node and remove if empty
  if (previousTextNode) {
    previousTextNode.data = previousTextNode.data.replace(/ $/, "");
    if (!previousTextNode.data) {
      removeAndGetNext(previousTextNode);
    }
  }
}

// Export the function for use in other modules
module.exports = normalizeWhitespaceInDomElement;
