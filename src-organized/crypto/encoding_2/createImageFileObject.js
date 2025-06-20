/**
 * Creates an image file object with base64 encoding, MIME type, and original size.
 *
 * @param {Buffer} imageBuffer - The image data as a Buffer object.
 * @param {string} imageFormat - The image format (e.g., 'png', 'jpeg').
 * @param {number} originalSize - The original size of the image in bytes.
 * @returns {Object} An object describing the image file, including base64 data, MIME type, and original size.
 */
function createImageFileObject(imageBuffer, imageFormat, originalSize) {
  return {
    type: "image",
    file: {
      // Convert the image buffer to a base64-encoded string
      base64: imageBuffer.toString("base64"),
      // Construct the MIME type string
      type: `image/${imageFormat}`,
      // Include the original size in bytes
      originalSize: originalSize
    }
  };
}

module.exports = createImageFileObject;