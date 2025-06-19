/**
 * Resizes and compresses an image buffer using the sharp library, ensuring the output does not exceed a specified maximum byte size.
 *
 * @async
 * @function resizeAndCompressImageBuffer
 * @param {Object} imageProcessingOptions - Options for image processing.
 * @param {Buffer} imageProcessingOptions.imageBuffer - The original image buffer to process.
 * @param {Function} imageProcessingOptions.sharp - The sharp instance or function for image processing.
 * @param {number} imageProcessingOptions.maxBytes - The maximum allowed size (in bytes) for the output buffer.
 * @param {number} imageProcessingOptions.originalSize - The original size of the image (used for metadata or logging).
 * @returns {Promise<Buffer|null>} The processed PNG buffer if isBlobOrFileLikeObject meets the size constraint, otherwise null.
 */
async function resizeAndCompressImageBuffer(imageProcessingOptions) {
  // Destructure the required properties from the options object
  const {
    imageBuffer,
    sharp,
    maxBytes,
    originalSize
  } = imageProcessingOptions;

  // Resize the image to fit within 800x800 pixels, do not enlarge if smaller, and convert to PNG with compression
  const processedBuffer = await sharp(imageBuffer)
    .resize(800, 800, {
      fit: "inside",
      withoutEnlargement: true
    })
    .png({
      compressionLevel: 9, // Maximum compression
      palette: true,      // Use palette-based (indexed) PNG
      colors: 64          // Limit palette to 64 colors
    })
    .toBuffer();

  // Check if the processed image fits within the allowed size
  if (processedBuffer.length <= maxBytes) {
    // lw is assumed to be a function that wraps the buffer with additional metadata or processing
    return lw(processedBuffer, "png", originalSize);
  }

  // Return null if the processed image exceeds the size limit
  return null;
}

module.exports = resizeAndCompressImageBuffer;
