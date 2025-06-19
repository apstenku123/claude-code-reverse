/**
 * Attempts to generate a resized image buffer that fits within a specified byte size limit.
 * Iteratively resizes the image to several scales, returning the first that fits the limit.
 *
 * @param {Object} imageOptions - Options and data for the image processing.
 * @param {Buffer} imageOptions.imageBuffer - The raw image buffer to process.
 * @param {Object} imageOptions.metadata - Metadata about the image (width, height).
 * @param {number} [imageOptions.metadata.width=2000] - The width of the image.
 * @param {number} [imageOptions.metadata.height=2000] - The height of the image.
 * @param {string} imageOptions.format - The desired output image format (e.g., 'jpg', 'png').
 * @param {number} imageOptions.maxBytes - The maximum allowed size in bytes for the output image.
 * @param {function} imageOptions.sharp - The sharp instance or function for image processing.
 * @param {number} imageOptions.originalSize - The original size of the image in bytes.
 * @returns {Promise<Object|null>} a promise that resolves to an image file object if successful, or null if no suitable size is found.
 */
async function generateResizedImageWithinByteLimit(imageOptions) {
  // Array of scale factors to try, from largest to smallest
  const scaleFactors = [1, 0.75, 0.5, 0.25];

  for (const scale of scaleFactors) {
    // Calculate target dimensions, defaulting to 2000 if not provided
    const targetWidth = Math.round((imageOptions.metadata.width || 2000) * scale);
    const targetHeight = Math.round((imageOptions.metadata.height || 2000) * scale);

    // Create a sharp instance and resize the image
    let sharpInstance = imageOptions.sharp(imageOptions.imageBuffer).resize(targetWidth, targetHeight, {
      fit: "inside",
      withoutEnlargement: true
    });

    // Apply additional processing based on format (e.g., compression)
    sharpInstance = applyImageFormatOptions(sharpInstance, imageOptions.format);

    // Generate the output buffer
    const outputBuffer = await sharpInstance.toBuffer();

    // If the output fits within the byte limit, return the image file object
    if (outputBuffer.length <= imageOptions.maxBytes) {
      // Use 'jpeg' for 'jpg' format, otherwise use the provided format
      const mimeType = imageOptions.format === "jpg" ? "jpeg" : imageOptions.format;
      return createImageFileObject(outputBuffer, mimeType, imageOptions.originalSize);
    }
  }

  // If no suitable size found, return null
  return null;
}

module.exports = generateResizedImageWithinByteLimit;