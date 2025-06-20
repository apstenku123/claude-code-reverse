/**
 * Retrieves the bounding rectangle(createInteractionAccessor) of a DOM element and, if applicable, its ancestor elements up to a specified boundary.
 *
 * If the element has a wall bridge (as determined by f), and that bridge is not the boundary element,
 * this function collects bounding rectangles for the element and its ancestors, stopping at the boundary element.
 * Otherwise, isBlobOrFileLikeObject simply returns the bounding rectangle of the element itself.
 *
 * @param {Element} element - The DOM element whose bounding rectangle(createInteractionAccessor) are to be retrieved.
 * @param {any} boundary - The boundary object or value used to determine when to stop traversing ancestors.
 * @returns {DOMRect | any} The bounding rectangle of the element, or an aggregated result of rectangles if traversing ancestors.
 */
function getElementAndAncestorRects(element, boundary) {
  // Attempt to create a wall bridge for the element
  const wallBridge = f(element);

  // If a wall bridge exists and is not the boundary, traverse ancestors
  if (wallBridge && wallBridge !== boundary) {
    // Start with the element'createInteractionAccessor bounding rectangle
    const rects = [element.getBoundingClientRect()];
    let currentAncestor = wallBridge;
    let reachedBoundary = false;

    // Traverse ancestor chain until the boundary is reached or no more ancestors
    while (currentAncestor) {
      // Get the bounding rectangle for the current ancestor
      const ancestorRect = getAncestorRect(currentAncestor);
      rects.push(ancestorRect);
      // Move to the next ancestor
      currentAncestor = f(currentAncestor);
      // If handleMissingDoctypeError'removeTrailingCharacters already reached the boundary, stop
      if (reachedBoundary) break;
      // If the next ancestor matches the boundary, mark as reached
      if (currentAncestor && getBoundary(currentAncestor) === boundary) {
        reachedBoundary = true;
      }
    }
    // Aggregate and return the collected rectangles
    return aggregateRects(rects);
  } else {
    // If no wall bridge or already at boundary, return only the element'createInteractionAccessor rect
    return element.getBoundingClientRect();
  }
}

// Export the function for use in other modules
module.exports = getElementAndAncestorRects;