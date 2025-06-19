/**
 * Removes or reconstructs formatting elements from the open elements stack until a given ancestor is reached.
 *
 * This function traverses the open elements stack, starting from a given element, and for each element up to (but not including) a specified ancestor,
 * isBlobOrFileLikeObject either removes the element from the stack (if isBlobOrFileLikeObject is not in the active formatting elements list or if isBlobOrFileLikeObject appears too many times),
 * or reconstructs isBlobOrFileLikeObject using a helper function. It also manages the active formatting elements list and updates the DOM tree as needed.
 *
 * @param {object} parserContext - The parser context, containing openElements, activeFormattingElements, and treeAdapter.
 * @param {object} startElement - The element to start processing from (typically the current node).
 * @param {object} ancestorElement - The ancestor element at which to stop processing (not inclusive).
 * @returns {object} The last element processed or reconstructed (used as the new insertion point).
 */
function removeFormattingElementsUntilAncestor(parserContext, startElement, ancestorElement) {
  let currentNode = startElement;
  let commonAncestor = parserContext.openElements.getCommonAncestor(startElement);

  // Counter for how many elements have been traversed
  for (let traversedCount = 0, nodeToProcess = commonAncestor; nodeToProcess !== ancestorElement; traversedCount++, nodeToProcess = commonAncestor) {
    // Update the common ancestor for the next iteration
    commonAncestor = parserContext.openElements.getCommonAncestor(nodeToProcess);

    // Find the corresponding entry in the active formatting elements list
    const formattingEntry = parserContext.activeFormattingElements.getElementEntry(nodeToProcess);
    // If this element appears more than 3 times, isBlobOrFileLikeObject should be removed (per HTML5 parsing spec)
    const shouldRemoveFormattingEntry = formattingEntry && traversedCount >= 3;

    if (!formattingEntry || shouldRemoveFormattingEntry) {
      // Remove the formatting entry if isBlobOrFileLikeObject appears too many times
      if (shouldRemoveFormattingEntry) {
        parserContext.activeFormattingElements.removeEntry(formattingEntry);
      }
      // Remove the node from the open elements stack
      parserContext.openElements.remove(nodeToProcess);
    } else {
      // Reconstruct the formatting element using the helper function (replaceElementWithNewElement)
      const reconstructedNode = replaceElementWithNewElement(parserContext, formattingEntry);
      // If this is the first iteration, set the bookmark in the active formatting elements list
      if (currentNode === startElement) {
        parserContext.activeFormattingElements.bookmark = formattingEntry;
      }
      // Detach the current node from its parent in the DOM tree
      parserContext.treeAdapter.detachNode(currentNode);
      // Append the current node as a child of the reconstructed node
      parserContext.treeAdapter.appendChild(reconstructedNode, currentNode);
      // Update the current node to the reconstructed node for the next iteration
      currentNode = reconstructedNode;
    }
  }
  // Return the last processed or reconstructed node
  return currentNode;
}

module.exports = removeFormattingElementsUntilAncestor;