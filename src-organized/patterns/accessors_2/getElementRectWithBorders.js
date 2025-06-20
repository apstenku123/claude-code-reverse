/**
 * Combines the bounding client rectangle of a DOM element with its border widths.
 *
 * @param {Element} element - The DOM element to measure.
 * @returns {any} The result of merging the element'createInteractionAccessor bounding rectangle with its border widths via eK().
 */
function getElementRectWithBorders(element) {
  // Retrieve the computed border widths for the element
  const borderWidths = handleComponentWillReceiveProps(element);

  // Get the element'createInteractionAccessor bounding client rectangle
  const boundingRect = element.getBoundingClientRect();

  // Create an object with the border widths and zeroed width/height
  const borderRect = {
    top: borderWidths.borderTop,
    left: borderWidths.borderLeft,
    bottom: borderWidths.borderBottom,
    right: borderWidths.borderRight,
    width: 0,
    height: 0
  };

  // Merge the bounding rectangle and border rectangle using eK()
  return eK([boundingRect, borderRect]);
}

module.exports = getElementRectWithBorders;