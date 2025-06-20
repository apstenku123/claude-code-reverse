/**
 * Attempts to resize and compress an image buffer to fit within a specified maximum byte size.
 * Tries multiple scaling factors, returning the first successful result as a file object.
 *
 * @param {Object} imageOptions - The image processing options and metadata.
 * @param {Buffer} imageOptions.imageBuffer - The raw image buffer to process.
 * @param {Object} imageOptions.metadata - Metadata containing width and height of the image.
 * @param {number} [imageOptions.metadata.width=2000] - The width of the image (default 2000 if missing).
 * @param {number} [imageOptions.metadata.height=2000] - The height of the image (default 2000 if missing).
 * @param {Function} imageOptions.sharp - The sharp instance/function for image processing.
 * @param {string} imageOptions.format - The target image format (e.g., 'jpg', 'png').
 * @param {number} imageOptions.maxBytes - The maximum allowed size in bytes for the output image.
 * @param {number} imageOptions.originalSize - The original file size in bytes.
 * @returns {Promise<Object|null>} The image file object if successful, or null if all attempts exceed maxBytes.
 */
async function resizeImageToMaxBytes(imageOptions) {
  // Scaling factors to try, from largest to smallest
  const scaleFactors = [1, 0.75, 0.5, 0.25];

  for (const scale of scaleFactors) {
    // Calculate new dimensions based on scale
    const targetWidth = Math.round((imageOptions.metadata.width || 2000) * scale);
    const targetHeight = Math.round((imageOptions.metadata.height || 2000) * scale);

    // Resize image using sharp, keeping aspect ratio and preventing enlargement
    let sharpInstance = imageOptions.sharp(imageOptions.imageBuffer).resize(targetWidth, targetHeight, {
      fit: "inside",
      withoutEnlargement: true
    });

    // Apply additional processing (e.g., format conversion) via applyImageFormatOptions
    sharpInstance = applyImageFormatOptions(sharpInstance, imageOptions.format);

    // Get the processed image buffer
    const outputBuffer = await sharpInstance.toBuffer();

    // If the buffer is within the allowed size, return as a file object
    if (outputBuffer.length <= imageOptions.maxBytes) {
      // Use 'jpeg' as the mime type if format is 'jpg'
      const mimeType = imageOptions.format === "jpg" ? "jpeg" : imageOptions.format;
      return createImageFileObject(outputBuffer, mimeType, imageOptions.originalSize);
    }
  }

  // If all attempts fail, return null
  return null;
}

module.exports = resizeImageToMaxBytes;