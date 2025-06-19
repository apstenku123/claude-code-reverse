/**
 * Creates an image object containing base64-encoded data, MIME type, and original size.
 *
 * @param {Buffer} imageBuffer - The image data as a Buffer object.
 * @param {string} imageFormat - The image format (e.g., 'png', 'jpeg').
 * @param {number} originalSize - The original size of the image in bytes.
 * @returns {Object} An object representing the image with base64 data, MIME type, and original size.
 */
function createImage(imageBuffer, imageFormat, originalSize) {
  return {
    type: "image",
    file: {
      // Convert the image buffer to a base64-encoded string
      base64: imageBuffer.toString("base64"),
      // Construct the MIME type string using the provided format
      type: `image/${imageFormat}`,
      // Include the original size of the image
      originalSize: originalSize
    }
  };
}

module.exports = createImage;