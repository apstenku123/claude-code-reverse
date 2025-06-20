/**
 * Attempts to resize and compress an image buffer to fit within a specified maximum byte size.
 * Tries multiple scaling factors, returning the first resized image that fits the size constraint.
 *
 * @async
 * @function resizeImageToFitMaxBytes
 * @param {Object} imageOptions - The image processing options.
 * @param {Buffer} imageOptions.imageBuffer - The original image buffer to process.
 * @param {Object} imageOptions.metadata - Metadata containing width and height of the image.
 * @param {number} [imageOptions.metadata.width=2000] - The width of the image (defaults to 2000 if not provided).
 * @param {number} [imageOptions.metadata.height=2000] - The height of the image (defaults to 2000 if not provided).
 * @param {Function} imageOptions.sharp - The sharp instance or function for image processing.
 * @param {string} imageOptions.format - The image format (e.g., 'jpg', 'png').
 * @param {number} imageOptions.maxBytes - The maximum allowed byte size for the output image.
 * @param {number} imageOptions.originalSize - The original size of the image (used for downstream processing).
 * @returns {Promise<Buffer|null>} The processed image buffer if isBlobOrFileLikeObject fits within maxBytes, otherwise null.
 */
async function resizeImageToFitMaxBytes(imageOptions) {
  // Scaling factors to try, from largest to smallest
  const scalingFactors = [1, 0.75, 0.5, 0.25];

  for (const scale of scalingFactors) {
    // Calculate new dimensions, defaulting to 2000 if not provided
    const targetWidth = Math.round((imageOptions.metadata.width || 2000) * scale);
    const targetHeight = Math.round((imageOptions.metadata.height || 2000) * scale);

    // Resize the image using sharp, keeping aspect ratio inside the bounding box
    let resizedImage = imageOptions.sharp(imageOptions.imageBuffer).resize(targetWidth, targetHeight, {
      fit: "inside",
      withoutEnlargement: true
    });

    // Apply additional processing based on format (e.g., compression)
    resizedImage = applyImageFormatOptions(resizedImage, imageOptions.format);

    // Convert the processed image to a buffer
    const outputBuffer = await resizedImage.toBuffer();

    // If the buffer fits within the maximum byte size, return the processed image
    if (outputBuffer.length <= imageOptions.maxBytes) {
      // Use 'jpeg' instead of 'jpg' for format if needed
      const outputFormat = imageOptions.format === "jpg" ? "jpeg" : imageOptions.format;
      return lw(outputBuffer, outputFormat, imageOptions.originalSize);
    }
  }

  // If no resized image fits within the size constraint, return null
  return null;
}

module.exports = resizeImageToFitMaxBytes;
