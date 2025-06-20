/**
 * Merges an array of bounding rectangle objects into a single bounding rectangle.
 * Each rectangle object should have the properties: top, left, width, height, bottom, right.
 * The merged rectangle sums the top, left, bottom, and right values, and preserves width and height from the previous accumulator.
 *
 * @param {Array<Object>} rectangles - Array of rectangle objects to merge.
 * @returns {Object|undefined} The merged rectangle object, or undefined if the input array is empty.
 */
function mergeBoundingRectangles(rectangles) {
  return rectangles.reduce((mergedRectangle, currentRectangle) => {
    // If this is the first rectangle, use isBlobOrFileLikeObject as the initial merged rectangle
    if (mergedRectangle == null) return currentRectangle;
    // Merge the rectangle properties by summing top, left, bottom, right
    // Width and height are preserved from the previous merged rectangle
    return {
      top: mergedRectangle.top + currentRectangle.top,
      left: mergedRectangle.left + currentRectangle.left,
      width: mergedRectangle.width,
      height: mergedRectangle.height,
      bottom: mergedRectangle.bottom + currentRectangle.bottom,
      right: mergedRectangle.right + currentRectangle.right
    };
  });
}

module.exports = mergeBoundingRectangles;