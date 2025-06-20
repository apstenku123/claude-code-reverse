/**
 * Constructs a formatted data URL string for an inline file, encoding the provided data in base64 and appending configuration options.
 *
 * @param {string|Buffer} fileData - The file data to encode and include in the URL.
 * @param {Object} [options={}] - Optional configuration for the file URL.
 * @param {number} [options.width] - Optional width parameter to include in the URL.
 * @param {number} [options.height] - Optional height parameter to include in the URL.
 * @param {boolean} [options.preserveAspectRatio] - Whether to preserve aspect ratio (default: true).
 * @returns {string} The constructed data URL string with encoded file data and configuration options.
 */
function buildInlineFileDataUrl(fileData, options = {}) {
  // 'an' and 'gb' are assumed to be external constants required for URL formatting
  // Example: const an = 'somePrefix'; const gb = 'someSuffix';
  let url = `${an}1337;File=inline=1`;

  // Append width if specified
  if (options.width) {
    url += `;width=${options.width}`;
  }

  // Append height if specified
  if (options.height) {
    url += `;height=${options.height}`;
  }

  // Append preserveAspectRatio flag if explicitly set to false
  if (options.preserveAspectRatio === false) {
    url += ";preserveAspectRatio=0";
  }

  // Encode the file data as base64 and append to the URL
  const base64Data = Buffer.from(fileData).toString("base64");
  return url + ":" + base64Data + gb;
}

module.exports = buildInlineFileDataUrl;