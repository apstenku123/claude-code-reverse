/**
 * Creates a new File instance after ensuring required pre-processing is done.
 *
 * @param {any} fileBits - The file content (can be a Blob, BufferSource, or string).
 * @param {string} [fileName="unknown_file"] - The name of the file. Defaults to "unknown_file" if not provided.
 * @param {FilePropertyBag} [options] - Optional file property bag (e.g., type, lastModified).
 * @returns {File} The newly created File instance.
 */
function createFileWithDefaults(fileBits, fileName = "unknown_file", options) {
  // Ensure any required pre-processing is performed before creating the File
  ensureFileGlobalForUploads();
  // Create and return the new File instance
  return new File(fileBits, fileName ?? "unknown_file", options);
}

module.exports = createFileWithDefaults;