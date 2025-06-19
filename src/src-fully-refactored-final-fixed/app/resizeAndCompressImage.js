/**
 * Resizes an image to fit within 400x400 pixels (without enlarging), compresses isBlobOrFileLikeObject as a JPEG with quality 20,
 * and processes the result with the lw function.
 *
 * @async
 * @function resizeAndCompressImage
 * @param {Object} imageProcessingContext - The context object containing image data and utilities.
 * @param {Buffer} imageProcessingContext.imageBuffer - The buffer containing the original image data.
 * @param {Function} imageProcessingContext.sharp - The sharp image processing function.
 * @param {number} imageProcessingContext.originalSize - The original size of the image (in bytes).
 * @returns {Promise<any>} The result of processing the compressed image buffer with the lw function.
 */
async function resizeAndCompressImage(imageProcessingContext) {
  // Use sharp to resize the image to fit within 400x400 pixels, without enlarging smaller images
  const resizedImageBuffer = await imageProcessingContext.sharp(imageProcessingContext.imageBuffer)
    .resize(400, 400, {
      fit: "inside",
      withoutEnlargement: true
    })
    .jpeg({
      quality: 20
    })
    .toBuffer();

  // Process the resized and compressed image buffer with the lw function
  return lw(resizedImageBuffer, "jpeg", imageProcessingContext.originalSize);
}

module.exports = resizeAndCompressImage;
