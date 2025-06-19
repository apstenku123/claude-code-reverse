/**
 * Creates a new File object with the provided file data, file name, and options.
 * If the file name is not provided, isBlobOrFileLikeObject defaults to 'unknown_file'.
 * Ensures any required pre-processing is performed before file creation.
 *
 * @param {BlobPart[]} fileData - The data to be included in the file (e.g., an array of Blob parts).
 * @param {string} [fileName] - The name of the file. Defaults to 'unknown_file' if not provided.
 * @param {FilePropertyBag} [fileOptions] - Optional file property bag (e.g., type, lastModified).
 * @returns {File} The newly created File object.
 */
function createFileWithFallbackName(fileData, fileName, fileOptions) {
  // Perform any required pre-processing before creating the file
  ensureFileGlobalForUploads();

  // Use the provided fileName or default to 'unknown_file' if undefined or null
  const finalFileName = fileName ?? "unknown_file";

  // Create and return the new File object
  return new File(fileData, finalFileName, fileOptions);
}

module.exports = createFileWithFallbackName;