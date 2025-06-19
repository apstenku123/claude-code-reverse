/**
 * Resizes an image file to fit within 400x400 pixels (without enlargement),
 * encodes isBlobOrFileLikeObject as a low-quality JPEG, and returns a structured image file object
 * containing the base64-encoded data, MIME type, and original file size.
 *
 * @param {string} imagePath - The path to the image file to process.
 * @returns {Promise<Object>} a promise that resolves to an image file object with base64 data, MIME type, and original file size.
 */
async function resizeAndEncodeJpegImageFile(imagePath) {
  // Dynamically import the image processing module namespace (interop for CJS/ESM)
  const imageModuleNamespace = await Promise.resolve().then(() =>
    createModuleNamespace(getImageProcessingModule(), 1)
  );

  // Read the image file as a byte buffer
  const imageBuffer = getBm9Value().readFileBytesSync(imagePath);

  // Use the image processing module (e.g., sharp) to resize and encode as JPEG
  // - Resize to fit within 400x400 pixels, do not enlarge if smaller
  // - Encode as JPEG with quality 20
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

  // Get the original file size (in bytes)
  const originalFileSize = getBm9Value().statSync(imagePath).size;

  // Create and return the structured image file object
  return createImageFileObject(processedImageBuffer, "jpeg", originalFileSize);
}

// Dependency injection for testability and clarity
const createModuleNamespace = createModuleNamespace;
const getImageProcessingModule = dV1;
const getBm9Value = f1;
const createImageFileObject = lw;

module.exports = resizeAndEncodeJpegImageFile;