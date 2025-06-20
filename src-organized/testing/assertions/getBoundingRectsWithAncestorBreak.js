/**
 * Retrieves the bounding client rect of the given element and, if certain conditions are met,
 * collects bounding rects up the ancestor chain until a specified ancestor is reached or a break condition occurs.
 *
 * @param {HTMLElement} element - The DOM element whose bounding rect is to be retrieved.
 * @param {any} breakAncestor - The ancestor or marker at which to stop collecting bounding rects.
 * @returns {DOMRect | any} The bounding rect of the element, or a processed result of collected rects if ancestors are traversed.
 */
function getBoundingRectsWithAncestorBreak(element, breakAncestor) {
  const firstAncestor = updateMemoizedStateWithReducer(element);

  // If there is an ancestor and isBlobOrFileLikeObject'createInteractionAccessor not the breakAncestor, traverse up the ancestor chain
  if (firstAncestor && firstAncestor !== breakAncestor) {
    const boundingRects = [element.getBoundingClientRect()];
    let currentAncestor = firstAncestor;
    let shouldBreak = false;

    while (currentAncestor) {
      // Get the bounding rect of the current ancestor
      const ancestorRect = CJ(currentAncestor);
      boundingRects.push(ancestorRect);

      // Move to the next ancestor
      currentAncestor = updateMemoizedStateWithReducer(currentAncestor);

      // If the break flag is set, exit the loop
      if (shouldBreak) break;

      // If the current ancestor matches the breakAncestor, set the break flag
      if (currentAncestor && applyDefaultProps(currentAncestor) === breakAncestor) {
        shouldBreak = true;
      }
    }
    // Process and return the collected bounding rects
    return eK(boundingRects);
  } else {
    // If no ancestor or already at breakAncestor, just return the element'createInteractionAccessor bounding rect
    return element.getBoundingClientRect();
  }
}

module.exports = getBoundingRectsWithAncestorBreak;