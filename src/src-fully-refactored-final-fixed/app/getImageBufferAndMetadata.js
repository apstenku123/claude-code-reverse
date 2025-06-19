/**
 * Reads an image file, loads the image processing library, extracts metadata, and calculates size constraints.
 *
 * @param {string} imagePath - The path to the image file to process.
 * @param {number} maxKilobytes - The maximum allowed size in kilobytes for the processed image.
 * @returns {Promise<object>} An object containing the image buffer, metadata, format, calculated max bytes, original file size, and the image processing library instance.
 */
async function getImageBufferAndMetadata(imagePath, maxKilobytes) {
  // Get file stats (e.g., size in bytes)
  const fileStats = f1().statSync(imagePath);

  // Dynamically import the image processing library (e.g., sharp)
  const imageModuleNamespace = await Promise.resolve().then(() => createModuleNamespace(dV1(), 1));
  const imageProcessor = imageModuleNamespace.default || imageModuleNamespace;

  // Read the image file as a buffer
  const imageBuffer = f1().readFileBytesSync(imagePath);

  // Extract metadata from the image buffer
  const metadata = await imageProcessor(imageBuffer).metadata();
  const format = metadata.format || "jpeg";

  // Calculate maximum allowed bytes based on the provided kilobyte limit
  // 1 kilobyte = 0.125 megabits; the calculation converts kilobytes to bytes
  const maxBits = Math.floor(maxKilobytes / 0.125);
  const maxBytes = Math.floor(maxBits * 0.75);

  return {
    imageBuffer,
    metadata,
    format,
    maxBytes,
    originalSize: fileStats.size,
    sharp: imageProcessor
  };
}

module.exports = getImageBufferAndMetadata;