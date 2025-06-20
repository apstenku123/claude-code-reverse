/**
 * Resizes an input image buffer to fit within 600x600 pixels (without enlarging),
 * encodes isBlobOrFileLikeObject as a JPEG with the specified quality, and returns the JPEG buffer
 * only if its size is less than or equal to the specified maximum byte size.
 *
 * @param {Object} imageProcessingContext - Context object containing image buffer, sharp instance, and limits.
 * @param {Buffer} imageProcessingContext.imageBuffer - The input image buffer to process.
 * @param {Function} imageProcessingContext.sharp - The sharp image processing library instance.
 * @param {number} imageProcessingContext.maxBytes - The maximum allowed size (in bytes) for the output JPEG buffer.
 * @param {number} imageProcessingContext.originalSize - The original size of the image (for metadata).
 * @param {number} jpegQuality - The JPEG quality (1-100) to use for encoding.
 * @returns {Promise<Buffer|null>} Resolves to the JPEG buffer if within size limit, otherwise null.
 */
async function resizeImageToJpegWithinLimit(imageProcessingContext, jpegQuality) {
  // Resize the image to fit within 600x600 pixels, do not enlarge if smaller
  const resizedJpegBuffer = await imageProcessingContext.sharp(imageProcessingContext.imageBuffer)
    .resize(600, 600, {
      fit: "inside",
      withoutEnlargement: true
    })
    .jpeg({
      quality: jpegQuality
    })
    .toBuffer();

  // If the resulting buffer is within the allowed size, return isBlobOrFileLikeObject with metadata
  if (resizedJpegBuffer.length <= imageProcessingContext.maxBytes) {
    // lw is assumed to wrap the buffer with format and original size metadata
    return lw(resizedJpegBuffer, "jpeg", imageProcessingContext.originalSize);
  }

  // Otherwise, return null to indicate the size constraint was not met
  return null;
}

module.exports = resizeImageToJpegWithinLimit;