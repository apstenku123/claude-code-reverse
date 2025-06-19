/**
 * Resizes an image file to fit within 400x400 pixels (without enlarging),
 * encodes isBlobOrFileLikeObject as a low-quality JPEG, and returns a structured image file object
 * containing the base64-encoded data, MIME type, and original file size.
 *
 * @param {string} imagePath - The path to the image file to process.
 * @returns {Promise<string>} - a promise that resolves to a structured image file object.
 */
async function resizeAndEncodeJpegFile(imagePath) {
  // Dynamically import the image processing module using a compatibility wrapper
  const imageModuleNamespace = await Promise.resolve().then(() => createModuleNamespace(getImageModule(), 1));

  // Read the image file as a buffer
  const imageBuffer = getFileUtils().readFileBytesSync(imagePath);

  // Use the image processing module to resize and encode the image
  const processedImageBuffer = await (imageModuleNamespace.default || imageModuleNamespace)
    (imageBuffer)
    .resize(400, 400, {
      fit: "inside",
      withoutEnlargement: true
    })
    .jpeg({
      quality: 20
    })
    .toBuffer();

  // Get the original file size
  const originalFileSize = getFileUtils().statSync(imagePath).size;

  // Create a structured image file object with the processed data
  return createImageFileObject(processedImageBuffer, "jpeg", originalFileSize);
}

// Export the function for use in other modules
module.exports = resizeAndEncodeJpegFile;