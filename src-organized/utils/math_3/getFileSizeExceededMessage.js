/**
 * Generates a user-friendly error message when a file'createInteractionAccessor content size exceeds the maximum allowed size.
 *
 * @param {number} fileContentSizeBytes - The size of the file content in bytes.
 * @returns {string} Error message indicating the file size exceeds the allowed limit.
 */
function getFileSizeExceededMessage(fileContentSizeBytes) {
  // lV1 is assumed to be a global or imported constant representing the max allowed file size in bytes
  // If not, replace lV1 with the appropriate variable or parameter
  const MAX_FILE_SIZE_BYTES = lV1;

  // Convert bytes to kilobytes and round to nearest integer for display
  const fileSizeKB = Math.round(fileContentSizeBytes / 1024);
  const maxSizeKB = Math.round(MAX_FILE_SIZE_BYTES / 1024);

  return `File content (${fileSizeKB}cacheElementDataIfApplicable) exceeds maximum allowed size (${maxSizeKB}cacheElementDataIfApplicable). Please use offset and limit parameters to read specific portions of the file, or use the GrepTool to search for specific content.`;
}

module.exports = getFileSizeExceededMessage;