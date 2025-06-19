/**
 * Calculates the content width of an element by subtracting paddings and borders from its total computed width.
 *
 * @param {Object} element - The element object providing computed dimension methods.
 * @param {string} horizontalStart - The identifier for the start (e.g., 'left') horizontal side.
 * @param {string} horizontalEnd - The identifier for the end (e.g., 'right') horizontal side.
 * @returns {number} The computed content width of the element.
 */
function calculateContentWidth(element, horizontalStart, horizontalEnd) {
  // Get the total computed width of the element
  const totalWidth = element.getComputedWidth();

  // Subtract the computed padding for both horizontal sides
  const paddingStart = element.getComputedPadding(horizontalStart);
  const paddingEnd = element.getComputedPadding(horizontalEnd);

  // Subtract the computed border for both horizontal sides
  const borderStart = element.getComputedBorder(horizontalStart);
  const borderEnd = element.getComputedBorder(horizontalEnd);

  // Calculate the content width by removing paddings and borders from the total width
  const contentWidth = totalWidth - paddingStart - paddingEnd - borderStart - borderEnd;

  return contentWidth;
}

module.exports = calculateContentWidth;