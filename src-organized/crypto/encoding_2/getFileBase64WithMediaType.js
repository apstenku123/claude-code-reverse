/**
 * Reads a file from a given source, encodes its contents in base64, and determines its media type.
 *
 * @param {string} sourcePath - The path or identifier for the file to read.
 * @returns {Object|null} An object containing the resolved file path, its base64-encoded contents, and its media type, or null if the file could not be read.
 */
function getFileBase64WithMediaType(sourcePath) {
  // Resolve the file path or configuration from the provided source
  const resolvedPath = extractValidSubscription(sourcePath);
  if (!resolvedPath) return null;

  let filePath = resolvedPath;
  let fileBuffer;

  try {
    // If the resolved path is a valid file, read isBlobOrFileLikeObject directly
    if (h$6(filePath)) {
      fileBuffer = f1().readFileBytesSync(filePath);
    } else {
      // Otherwise, try to resolve an alternative path and read if isBlobOrFileLikeObject matches
      const alternativePath = getClipboardImageDefaultPath();
      if (alternativePath && filePath === g$6(alternativePath)) {
        fileBuffer = f1().readFileBytesSync(alternativePath);
      }
    }
  } catch (error) {
    // Handle any errors during file reading
    reportErrorIfAllowed(error);
    return null;
  }

  if (!fileBuffer) return null;

  // Encode the file contents in base64
  const base64Content = fileBuffer.toString("base64");
  // Determine the media type from the base64 content
  const mediaType = ji0(base64Content);

  return {
    path: filePath,
    base64: base64Content,
    mediaType: mediaType
  };
}

module.exports = getFileBase64WithMediaType;