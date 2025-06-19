/**
 * Traverses up the DOM tree from a given element, collecting bounding client rects
 * for each ancestor until a specified ancestor is reached or the root is hit.
 *
 * @param {Element} startElement - The DOM element to start from.
 * @param {Element} stopAncestor - The ancestor element at which to stop collecting rects.
 * @returns {Array<DOMRect>|DOMRect} An array of bounding client rects from the start element up to the stop ancestor, or a single rect if no traversal is needed.
 */
function getBoundingRectsUpToAncestor(startElement, stopAncestor) {
  // Get the immediate ancestor of the start element
  const firstAncestor = updateMemoizedStateWithReducer(startElement);

  // If there is an ancestor and isBlobOrFileLikeObject'createInteractionAccessor not the stopAncestor, begin traversal
  if (firstAncestor && firstAncestor !== stopAncestor) {
    // Initialize the array with the bounding rect of the start element
    const boundingRects = [startElement.getBoundingClientRect()];
    let currentAncestor = firstAncestor;
    let reachedStopAncestor = false;

    // Traverse up the DOM tree
    while (currentAncestor) {
      // Get the bounding rect of the current ancestor
      const ancestorRect = CJ(currentAncestor);
      boundingRects.push(ancestorRect);

      // Move to the next ancestor
      currentAncestor = updateMemoizedStateWithReducer(currentAncestor);

      // If handleMissingDoctypeError'removeTrailingCharacters already reached the stop ancestor, break
      if (reachedStopAncestor) break;

      // If the current ancestor matches the stopAncestor, set flag to break after this iteration
      if (currentAncestor && applyDefaultProps(currentAncestor) === stopAncestor) {
        reachedStopAncestor = true;
      }
    }
    // Process and return the collected bounding rects
    return eK(boundingRects);
  } else {
    // If no traversal is needed, just return the bounding rect of the start element
    return startElement.getBoundingClientRect();
  }
}

module.exports = getBoundingRectsUpToAncestor;