/**
 * Resizes an image buffer to fit within 400x400 pixels (without enlarging),
 * compresses isBlobOrFileLikeObject as a JPEG with quality 20, and returns a structured image file object.
 *
 * @async
 * @function resizeAndCreateJpegFileObject
 * @param {Object} imageProcessingContext - An object containing image processing utilities and data.
 * @param {Function} imageProcessingContext.sharp - a function (typically the 'sharp' library) for image manipulation.
 * @param {Buffer} imageProcessingContext.imageBuffer - The buffer of the image to process.
 * @param {number} imageProcessingContext.originalSize - The original size of the image in bytes.
 * @returns {Promise<Object>} a promise that resolves to a structured image file object containing base64-encoded JPEG data, MIME type, and original size.
 */
async function resizeAndCreateJpegFileObject(imageProcessingContext) {
  // Resize the image to fit within 400x400 pixels, do not enlarge if smaller, and compress as JPEG
  const resizedJpegBuffer = await imageProcessingContext.sharp(imageProcessingContext.imageBuffer)
    .resize(400, 400, {
      fit: "inside",
      withoutEnlargement: true
    })
    .jpeg({
      quality: 20
    })
    .toBuffer();

  // Create a structured image file object from the processed buffer
  return lw(resizedJpegBuffer, "jpeg", imageProcessingContext.originalSize);
}

module.exports = resizeAndCreateJpegFileObject;