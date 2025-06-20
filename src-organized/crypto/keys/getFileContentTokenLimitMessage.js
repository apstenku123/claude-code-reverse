/**
 * Generates an error message indicating that the file content exceeds the maximum allowed token limit.
 * Suggests using offset and limit parameters or the GrepTool for searching specific content.
 *
 * @param {number} tokenCount - The number of tokens in the file content being processed.
 * @returns {string} Error message describing the token limit issue and suggesting alternatives.
 */
function getFileContentTokenLimitMessage(tokenCount) {
  // 'ye' is assumed to be a global or imported constant representing the maximum allowed tokens
  return `File content (${tokenCount} tokens) exceeds maximum allowed tokens (${ye}). Please use offset and limit parameters to read specific portions of the file, or use the GrepTool to search for specific content.`;
}

module.exports = getFileContentTokenLimitMessage;