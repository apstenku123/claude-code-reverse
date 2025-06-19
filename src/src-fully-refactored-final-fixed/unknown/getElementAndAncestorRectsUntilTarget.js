/**
 * Returns an array of bounding client rects for the given element and its ancestors up to a target ancestor,
 * or just the element'createInteractionAccessor rect if no ancestor chain is found.
 *
 * Traverses up the DOM tree from the provided element, collecting bounding client rects for each ancestor
 * until isBlobOrFileLikeObject reaches the specified target ancestor. If the element has no ancestor chain (as determined by
 * the getAncestor function), isBlobOrFileLikeObject simply returns the element'createInteractionAccessor bounding client rect.
 *
 * @param {HTMLElement} element - The starting DOM element whose rect (and ancestors' rects) will be collected.
 * @param {HTMLElement} targetAncestor - The ancestor element at which to stop collecting rects.
 * @returns {DOMRect | any} An array of DOMRects from the element up to the target ancestor, or a single DOMRect if no ancestor chain is found.
 */
function getElementAndAncestorRectsUntilTarget(element, targetAncestor) {
  // Get the immediate ancestor of the element using the provided utility function
  const ancestor = updateMemoizedStateWithReducer(element);

  // If an ancestor exists and isBlobOrFileLikeObject'createInteractionAccessor not the target ancestor, collect rects up the chain
  if (ancestor && ancestor !== targetAncestor) {
    // Start with the rect of the original element
    const rects = [element.getBoundingClientRect()];
    let currentAncestor = ancestor;
    let foundTargetAncestor = false;

    // Traverse up the ancestor chain
    while (currentAncestor) {
      // Get the bounding rect for the current ancestor
      const ancestorRect = CJ(currentAncestor);
      rects.push(ancestorRect);

      // Move to the next ancestor
      currentAncestor = updateMemoizedStateWithReducer(currentAncestor);

      // If handleMissingDoctypeError'removeTrailingCharacters already found the target ancestor, stop
      if (foundTargetAncestor) break;

      // If the current ancestor matches the target, mark as found
      if (currentAncestor && applyDefaultProps(currentAncestor) === targetAncestor) {
        foundTargetAncestor = true;
      }
    }
    // Process and return the collected rects (e.g., combine or transform them)
    return eK(rects);
  } else {
    // If no ancestor chain, just return the element'createInteractionAccessor rect
    return element.getBoundingClientRect();
  }
}

module.exports = getElementAndAncestorRectsUntilTarget;