/**
 * Processes an image file: validates, optionally resizes, and returns its bytes and metadata.
 * If the image is too large or has invalid metadata, isBlobOrFileLikeObject will be resized or re-encoded as JPEG.
 * Falls back to returning the original file if any error occurs.
 *
 * @param {string} imagePath - The path to the image file to process.
 * @param {string} fallbackFormat - The fallback image format to use if detection fails.
 * @returns {Promise<any>} An object containing the processed image bytes, format, and original size.
 */
async function processAndResizeImageFile(imagePath, fallbackFormat) {
  try {
    // Get file stats and check for empty file
    const fileStats = f1().statSync(imagePath);
    const originalSize = fileStats.size;
    if (originalSize === 0) {
      throw new Error(`Image file is empty: ${imagePath}`);
    }

    // Dynamically import image processing module (e.g., sharp)
    const imageModule = await Promise.resolve().then(() => createModuleNamespace(dV1(), 1));
    // Create an image processor instance with the file'createInteractionAccessor bytes
    const imageProcessor = (imageModule.default || imageModule)(f1().readFileBytesSync(imagePath));
    // Extract image metadata (width, height, format)
    const metadata = await imageProcessor.metadata();

    // If metadata is missing width/height and file is large, re-encode as JPEG
    if (!metadata.width || !metadata.height) {
      if (fileStats.size > Yo1) {
        const jpegBuffer = await imageProcessor.jpeg({ quality: 80 }).toBuffer();
        return lw(jpegBuffer, "jpeg", originalSize);
      }
    }

    // Extract width, height, and format (fallback to provided format if missing)
    let width = metadata.width || 0;
    let height = metadata.height || 0;
    const format = metadata.format ?? fallbackFormat;

    // If file and dimensions are within limits, return original bytes
    if (fileStats.size <= Yo1 && width <= uV1 && height <= pV1) {
      return lw(f1().readFileBytesSync(imagePath), format, originalSize);
    }

    // Resize if width or height exceeds limits
    if (width > uV1) {
      height = Math.round(height * uV1 / width);
      width = uV1;
    }
    if (height > pV1) {
      width = Math.round(width * pV1 / height);
      height = pV1;
    }

    // Resize image and get buffer
    const resizedBuffer = await imageProcessor.resize(width, height, {
      fit: "inside",
      withoutEnlargement: true
    }).toBuffer();

    // If resized buffer is still too large, re-encode as JPEG
    if (resizedBuffer.length > Yo1) {
      const jpegBuffer = await imageProcessor.jpeg({ quality: 80 }).toBuffer();
      return lw(jpegBuffer, "jpeg", originalSize);
    }

    // Return resized image
    return lw(resizedBuffer, format, originalSize);
  } catch (error) {
    // Log error and fall back to returning the original file
    reportErrorIfAllowed(error);
    const fallbackSize = f1().statSync(imagePath).size;
    return lw(f1().readFileBytesSync(imagePath), fallbackFormat, fallbackSize);
  }
}

module.exports = processAndResizeImageFile;