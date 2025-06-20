/**
 * Generates a formatted data URL string with optional width, height, and aspect ratio parameters,
 * and appends the base64-encoded content of the provided input.
 *
 * @param {string|Buffer} fileContent - The content to be encoded and included in the data URL.
 * @param {Object} [options={}] - Optional configuration for the data URL.
 * @param {number} [options.width] - Optional width parameter to include in the URL.
 * @param {number} [options.height] - Optional height parameter to include in the URL.
 * @param {boolean} [options.preserveAspectRatio] - Whether to preserve aspect ratio (default: true).
 * @returns {string} The constructed data URL string with base64-encoded content.
 */
function generateInlineFileDataUrl(fileContent, options = {}) {
  // 'an' and 'gb' are assumed to be external constants required for URL formatting
  // Example: const an = 'data:image/png;base64,'; const gb = '';
  let dataUrl = `${an}1337;File=inline=1`;

  // Append width if provided
  if (options.width) {
    dataUrl += `;width=${options.width}`;
  }

  // Append height if provided
  if (options.height) {
    dataUrl += `;height=${options.height}`;
  }

  // If preserveAspectRatio is explicitly set to false, append the flag
  if (options.preserveAspectRatio === false) {
    dataUrl += ";preserveAspectRatio=0";
  }

  // Append the base64-encoded file content and the trailing 'gb' string
  return dataUrl + ":" + Buffer.from(fileContent).toString("base64") + gb;
}

module.exports = generateInlineFileDataUrl;