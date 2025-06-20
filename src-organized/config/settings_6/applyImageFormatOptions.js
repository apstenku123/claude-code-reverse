/**
 * Applies specific image format options to an image processing object based on the given format.
 *
 * @param {object} imageProcessor - An image processing object supporting format methods (e.g., png, jpeg, webp).
 * @param {string} format - The desired image format (e.g., 'png', 'jpeg', 'jpg', 'webp').
 * @returns {object} The image processing object with the specified format options applied, or the original object if the format is unrecognized.
 */
function applyImageFormatOptions(imageProcessor, format) {
  switch (format) {
    case "png":
      // Apply PNG-specific options: maximum compression and palette mode
      return imageProcessor.png({
        compressionLevel: 9,
        palette: true
      });
    case "jpeg":
    case "jpg":
      // Apply JPEG-specific options: set quality to 80
      return imageProcessor.jpeg({
        quality: 80
      });
    case "webp":
      // Apply WebP-specific options: set quality to 80
      return imageProcessor.webp({
        quality: 80
      });
    default:
      // If the format is unrecognized, return the original image processor object
      return imageProcessor;
  }
}

module.exports = applyImageFormatOptions;