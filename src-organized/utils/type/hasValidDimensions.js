/**
 * Checks if the given object has a valid width or height property.
 *
 * Returns true if either width or height is not equal to -1.
 *
 * @param {Object} dimensions - The object containing width and height properties.
 * @param {number} dimensions.width - The width value to check.
 * @param {number} dimensions.height - The height value to check.
 * @returns {boolean} True if width or height is not -1, otherwise false.
 */
function hasValidDimensions(dimensions) {
  // Check if either width or height is not -1
  return dimensions.width !== -1 || dimensions.height !== -1;
}

module.exports = hasValidDimensions;