/**
 * Resizes and compresses an image file to JPEG format with specific options.
 *
 * This function reads an image file from disk, resizes isBlobOrFileLikeObject to fit within 400x400 pixels (without enlarging),
 * compresses isBlobOrFileLikeObject to JPEG with quality 20, and returns the result as a base64-encoded JPEG string.
 *
 * @param {string} imagePath - The path to the image file to process.
 * @returns {Promise<string>} - a promise that resolves to the processed image as a base64-encoded JPEG string.
 */
async function resizeAndCompressImageToJpeg(imagePath) {
  // Dynamically import the image processing module using a compatibility wrapper
  const imageModuleNamespace = await Promise.resolve().then(() => createModuleNamespace(getImageProcessingModule(), 1));

  // Read the image file as a byte buffer
  const imageBuffer = getFileSystem().readFileBytesSync(imagePath);

  // Get the image processing function (default export or the module itself)
  const processImage = imageModuleNamespace.default || imageModuleNamespace;

  // Resize and compress the image using the processing library
  const processedImageBuffer = await processImage(imageBuffer)
    .resize(400, 400, {
      fit: "inside",
      withoutEnlargement: true
    })
    .jpeg({
      quality: 20
    })
    .toBuffer();

  // Get the original file size for metadata
  const originalFileSize = getFileSystem().statSync(imagePath).size;

  // Convert the processed image buffer to a base64-encoded JPEG string with metadata
  return convertToBase64WithMetadata(processedImageBuffer, "jpeg", originalFileSize);
}

module.exports = resizeAndCompressImageToJpeg;