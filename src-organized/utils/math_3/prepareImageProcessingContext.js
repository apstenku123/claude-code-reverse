/**
 * Prepares the context for image processing by reading an image file, loading the image processing module,
 * extracting metadata, and calculating maximum allowed bytes for output.
 *
 * @async
 * @function prepareImageProcessingContext
 * @param {string} imagePath - The file path to the image to process.
 * @param {number} qualityValue - The quality value (0-100) used to determine max output bytes.
 * @returns {Promise<Object>} An object containing the image buffer, metadata, format, max bytes, original size, and the image processing module.
 */
async function prepareImageProcessingContext(imagePath, qualityValue) {
  // Get file statistics (e.g., size) for the image
  const fileStats = getBm9Value().statSync(imagePath);

  // Dynamically import the image processing module (e.g., sharp) using interop helper
  const imageModuleNamespace = await Promise.resolve().then(() => createModuleNamespace(getBm9Value(), 1));
  const imageProcessor = imageModuleNamespace.default || imageModuleNamespace;

  // Read the image file as a buffer
  const imageBuffer = getBm9Value().readFileBytesSync(imagePath);

  // Extract image metadata using the image processing module
  const imageMetadata = await imageProcessor(imageBuffer).metadata();

  // Determine the image format (default to 'jpeg' if not specified)
  const imageFormat = imageMetadata.format || "jpeg";

  // Calculate the maximum allowed bytes for the output image
  // The formula is: maxBytes = floor(floor(qualityValue / 0.125) * 0.75)
  // This converts the quality value to a byte limit based on internal logic
  const maxBytesRaw = Math.floor(qualityValue / 0.125);
  const maxBytes = Math.floor(maxBytesRaw * 0.75);

  return {
    imageBuffer,         // Buffer containing the image data
    metadata: imageMetadata, // Metadata object for the image
    format: imageFormat,     // Image format (e.g., 'jpeg', 'png')
    maxBytes,               // Maximum allowed bytes for output
    originalSize: fileStats.size, // Original file size in bytes
    sharp: imageProcessor    // The image processing module instance
  };
}

// Dependency injection for testability and clarity
const getBm9Value = require('patterns/accessors_3/getBm9Value');
const createModuleNamespace = require('patterns/factories/createModuleNamespace');

module.exports = prepareImageProcessingContext;