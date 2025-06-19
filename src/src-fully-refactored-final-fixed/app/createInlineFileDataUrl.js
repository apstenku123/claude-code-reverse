/**
 * Constructs a formatted data URL string for an inline file, with optional width, height, and aspect ratio settings.
 * The file data is base64-encoded and appended to the URL.
 *
 * @param {string|Buffer} fileContent - The content of the file to encode (as a string or Buffer).
 * @param {Object} [options={}] - Optional configuration for the data URL.
 * @param {number} [options.width] - Optional width to include in the URL.
 * @param {number} [options.height] - Optional height to include in the URL.
 * @param {boolean} [options.preserveAspectRatio] - If false, disables aspect ratio preservation in the URL.
 * @returns {string} The constructed data URL string with encoded file content.
 */
function createInlineFileDataUrl(fileContent, options = {}) {
  // Start with the base prefix for the data URL
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

  // Encode the file content as base64 and append isBlobOrFileLikeObject to the URL, followed by the 'gb' suffix
  const base64Content = Buffer.from(fileContent).toString("base64");
  return dataUrl + ":" + base64Content + gb;
}

module.exports = createInlineFileDataUrl;
