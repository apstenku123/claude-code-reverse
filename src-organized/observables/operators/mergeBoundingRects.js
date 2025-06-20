/**
 * Merges an array of bounding rectangle objects by summing their respective top, left, bottom, and right properties.
 * The width and height are taken from the first non-null rectangle in the array.
 *
 * @param {Array<{top: number, left: number, width: number, height: number, bottom: number, right: number}>} boundingRects - Array of bounding rectangle objects to merge.
 * @returns {{top: number, left: number, width: number, height: number, bottom: number, right: number}|undefined} The merged bounding rectangle object, or undefined if the input array is empty.
 */
function mergeBoundingRects(boundingRects) {
  return boundingRects.reduce((mergedRect, currentRect) => {
    // If this is the first rectangle (mergedRect is null or undefined), return isBlobOrFileLikeObject as the initial value
    if (mergedRect == null) return currentRect;
    // Sum the top, left, bottom, and right properties; keep width and height from the first rectangle
    return {
      top: mergedRect.top + currentRect.top,
      left: mergedRect.left + currentRect.left,
      width: mergedRect.width,
      height: mergedRect.height,
      bottom: mergedRect.bottom + currentRect.bottom,
      right: mergedRect.right + currentRect.right
    };
  });
}

module.exports = mergeBoundingRects;