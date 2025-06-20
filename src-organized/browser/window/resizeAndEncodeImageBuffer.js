/**
 * Resizes an image buffer to fit within 600x600 pixels (without enlarging),
 * encodes isBlobOrFileLikeObject as a JPEG with the specified quality, and returns a structured
 * image file object if the result is within the allowed size limit.
 *
 * @async
 * @function resizeAndEncodeImageBuffer
 * @param {Object} imageProcessingContext - Context containing image buffer, sharp instance, maxBytes, and originalSize.
 * @param {number} jpegQuality - JPEG encoding quality (1-100).
 * @returns {Promise<Object|null>} Structured image file object if within size limit, otherwise null.
 */
async function resizeAndEncodeImageBuffer(imageProcessingContext, jpegQuality) {
  // Destructure required properties from the context
  const {
    sharp,         // Function to create a sharp instance
    imageBuffer,   // Buffer containing the original image data
    maxBytes,      // Maximum allowed size (in bytes) for the output image
    originalSize   // Original image size (for metadata)
  } = imageProcessingContext;

  // Resize the image to fit within 600x600 pixels, without enlarging, and encode as JPEG
  const resizedJpegBuffer = await sharp(imageBuffer)
    .resize(600, 600, {
      fit: "inside",
      withoutEnlargement: true
    })
    .jpeg({ quality: jpegQuality })
    .toBuffer();

  // If the resulting image is within the allowed size, return a structured image file object
  if (resizedJpegBuffer.length <= maxBytes) {
    // createImageFileObject: creates a file object with base64 data, mime type, and original size
    return createImageFileObject(resizedJpegBuffer, "jpeg", originalSize);
  }

  // Otherwise, return null to indicate the image is too large
  return null;
}

module.exports = resizeAndEncodeImageBuffer;