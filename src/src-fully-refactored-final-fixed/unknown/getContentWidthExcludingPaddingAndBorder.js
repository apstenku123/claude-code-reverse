/**
 * Calculates the content width of an element by subtracting the horizontal paddings and borders from its total computed width.
 *
 * @param {Object} element - The element object providing computed dimension methods.
 * @param {string} horizontalStart - The identifier for the starting horizontal side (e.g., 'left').
 * @param {string} horizontalEnd - The identifier for the ending horizontal side (e.g., 'right').
 * @returns {number} The width of the element'createInteractionAccessor content area, excluding horizontal paddings and borders.
 */
function getContentWidthExcludingPaddingAndBorder(element, horizontalStart, horizontalEnd) {
  // Get the total computed width of the element
  const totalWidth = element.getComputedWidth();

  // Subtract the computed padding for both horizontal sides
  const paddingStart = element.getComputedPadding(horizontalStart);
  const paddingEnd = element.getComputedPadding(horizontalEnd);

  // Subtract the computed border for both horizontal sides
  const borderStart = element.getComputedBorder(horizontalStart);
  const borderEnd = element.getComputedBorder(horizontalEnd);

  // Calculate the content width by removing paddings and borders from total width
  const contentWidth = totalWidth - paddingStart - paddingEnd - borderStart - borderEnd;

  return contentWidth;
}

module.exports = getContentWidthExcludingPaddingAndBorder;