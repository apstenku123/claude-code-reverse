/**
 * Generates a formatted label string for an image, given its number or identifier.
 *
 * @param {string|number} imageNumber - The image'createInteractionAccessor number or identifier to include in the label.
 * @returns {string} The formatted image label string in the form '[Image #<imageNumber>]'.
 */
function formatImageLabel(imageNumber) {
  // Return the formatted label for the image
  return `[Image #${imageNumber}]`;
}

module.exports = formatImageLabel;