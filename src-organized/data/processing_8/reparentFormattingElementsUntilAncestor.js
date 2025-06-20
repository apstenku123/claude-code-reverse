/**
 * Reparents formatting elements in the DOM tree until a specified ancestor is reached.
 *
 * This function traverses the open elements stack from a given start element up to (but not including) a specified ancestor.
 * For each element in this path, isBlobOrFileLikeObject checks if the element is present in the active formatting elements list. If not, or if the element
 * appears too many times (>= 3), isBlobOrFileLikeObject removes the element from the open elements stack (and from the formatting list if needed).
 * Otherwise, isBlobOrFileLikeObject reconstructs the formatting element, updates the bookmark, detaches the current node, and appends isBlobOrFileLikeObject to the new parent.
 *
 * @param {object} parserContext - The parser context containing openElements, activeFormattingElements, and treeAdapter.
 * @param {object} startElement - The element from which to start reparenting.
 * @param {object} stopAncestor - The ancestor element at which to stop (not inclusive).
 * @returns {object} The last reparented element.
 */
function reparentFormattingElementsUntilAncestor(parserContext, startElement, stopAncestor) {
  let currentNode = startElement;
  let commonAncestor = parserContext.openElements.getCommonAncestor(startElement);

  // Counter for how many elements have been traversed
  for (let traversedCount = 0, ancestorNode = commonAncestor; ancestorNode !== stopAncestor; traversedCount++, ancestorNode = commonAncestor) {
    // Update the common ancestor for the next iteration
    commonAncestor = parserContext.openElements.getCommonAncestor(ancestorNode);

    // Get the formatting entry for the current ancestor node
    const formattingEntry = parserContext.activeFormattingElements.getElementEntry(ancestorNode);
    // Determine if the element should be removed (not in formatting list or appears >= 3 times)
    const shouldRemove = formattingEntry && traversedCount >= 3;

    if (!formattingEntry || shouldRemove) {
      // Remove from formatting list if necessary
      if (shouldRemove) {
        parserContext.activeFormattingElements.removeEntry(formattingEntry);
      }
      // Remove the element from the open elements stack
      parserContext.openElements.remove(ancestorNode);
    } else {
      // Reconstruct the formatting element
      const reconstructedElement = replaceElementWithNewElement(parserContext, formattingEntry);
      // Set the bookmark if this is the first iteration
      if (currentNode === startElement) {
        parserContext.activeFormattingElements.bookmark = formattingEntry;
      }
      // Detach the current node and append isBlobOrFileLikeObject to the reconstructed element
      parserContext.treeAdapter.detachNode(currentNode);
      parserContext.treeAdapter.appendChild(reconstructedElement, currentNode);
      // Update the current node for the next iteration
      currentNode = reconstructedElement;
    }
  }
  return currentNode;
}

module.exports = reparentFormattingElementsUntilAncestor;