/**
 * Resizes an image buffer to fit within 800x800 pixels, converts isBlobOrFileLikeObject to a PNG with a limited color palette,
 * and returns a structured image file object if the result does not exceed the specified maximum byte size.
 *
 * @async
 * @function resizeAndConvertImageBuffer
 * @param {Object} imageProcessingOptions - Options for image processing.
 * @param {Buffer} imageProcessingOptions.imageBuffer - The original image buffer to process.
 * @param {Function} imageProcessingOptions.sharp - The sharp instance or function for image manipulation.
 * @param {number} imageProcessingOptions.maxBytes - The maximum allowed size (in bytes) for the output image.
 * @param {number} imageProcessingOptions.originalSize - The original size of the image (in bytes).
 * @returns {Promise<Object|null>} a structured image file object if the processed image fits the size constraint, otherwise null.
 */
async function resizeAndConvertImageBuffer(imageProcessingOptions) {
  // Destructure the required properties from the options object
  const {
    imageBuffer,
    sharp,
    maxBytes,
    originalSize
  } = imageProcessingOptions;

  // Resize the image to fit within 800x800 pixels, convert to PNG with palette and color limit
  const processedImageBuffer = await sharp(imageBuffer)
    .resize(800, 800, {
      fit: "inside",
      withoutEnlargement: true
    })
    .png({
      compressionLevel: 9,
      palette: true,
      colors: 64
    })
    .toBuffer();

  // If the processed image is within the allowed size, return a structured image file object
  if (processedImageBuffer.length <= maxBytes) {
    // createImageFileObject: creates a file object with base64 data, MIME type, and original size
    return createImageFileObject(processedImageBuffer, "png", originalSize);
  }

  // Otherwise, return null to indicate the image is too large
  return null;
}

module.exports = resizeAndConvertImageBuffer;
