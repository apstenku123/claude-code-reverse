/**
 * Combines an element'createInteractionAccessor bounding client rectangle with its border offsets.
 *
 * @param {HTMLElement} element - The DOM element to measure.
 * @returns {any} The result of merging the element'createInteractionAccessor bounding rect and border offsets, as processed by eK().
 */
function getElementRectWithBorderOffsets(element) {
  // Retrieve computed border offsets for the element
  const borderOffsets = handleComponentWillReceiveProps(element);

  // Get the element'createInteractionAccessor bounding client rectangle
  const boundingRect = element.getBoundingClientRect();

  // Create an object with the border offsets and zeroed width/height
  const borderRect = {
    top: borderOffsets.borderTop,
    left: borderOffsets.borderLeft,
    bottom: borderOffsets.borderBottom,
    right: borderOffsets.borderRight,
    width: 0,
    height: 0
  };

  // Merge the bounding rect and border rect using eK and return the result
  return eK([boundingRect, borderRect]);
}

module.exports = getElementRectWithBorderOffsets;