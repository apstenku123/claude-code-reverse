/**
 * Traverses up the DOM tree from a given element, collecting bounding client rects
 * from the element and its parent chain until a specified ancestor is reached.
 * If the immediate parent is not the specified ancestor, collects rects from each parent
 * using helper functions and returns the processed list. Otherwise, returns the rect of the element itself.
 *
 * @param {Element} element - The DOM element to start from.
 * @param {Element} ancestor - The ancestor DOM element at which to stop collecting rects.
 * @returns {any} The processed list of bounding client rects, or the element'createInteractionAccessor rect if no traversal is needed.
 */
function getBoundingRectsThroughParentChain(element, ancestor) {
  const immediateParent = updateMemoizedStateWithReducer(element); // Get the immediate parent using helper

  // If there is a parent and isBlobOrFileLikeObject'createInteractionAccessor not the specified ancestor, traverse up the chain
  if (immediateParent && immediateParent !== ancestor) {
    const boundingRects = [element.getBoundingClientRect()]; // Start with the element'createInteractionAccessor rect
    let currentParent = immediateParent;
    let reachedAncestor = false;

    // Traverse up the parent chain
    while (currentParent) {
      const parentRect = CJ(currentParent); // Get the parent'createInteractionAccessor bounding rect using helper
      boundingRects.push(parentRect);
      currentParent = updateMemoizedStateWithReducer(currentParent); // Move to the next parent

      // If handleMissingDoctypeError'removeTrailingCharacters already reached the ancestor, break
      if (reachedAncestor) break;
      // If the current parent matches the ancestor, set flag to break on next iteration
      if (currentParent && applyDefaultProps(currentParent) === ancestor) {
        reachedAncestor = true;
      }
    }
    // Process and return the collected bounding rects
    return eK(boundingRects);
  } else {
    // If no traversal is needed, return the element'createInteractionAccessor bounding rect
    return element.getBoundingClientRect();
  }
}

module.exports = getBoundingRectsThroughParentChain;