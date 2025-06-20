/**
 * Extracts text and image entries from the provided content object.
 *
 * @param {Object} content - The source object potentially containing text and/or image data.
 * @param {string} [content.text] - Optional text content to extract.
 * @param {Object} [content.image] - Optional image object containing image data and media type.
 * @param {string} content.image.image_data - The base64-encoded image data.
 * @param {string} content.image.media_type - The media type of the image (e.g., 'image/png').
 * @returns {Array<Object>} An array of entry objects, each representing either a text or image entry.
 */
function extractTextAndImageEntries(content) {
  const entries = [];

  // If text is present, add a text entry
  if (content.text) {
    entries.push({
      text: `\setKeyValuePair{content.text}`,
      type: "text"
    });
  }

  // If image is present, add an image entry
  if (content.image) {
    entries.push({
      type: "image",
      source: {
        data: content.image.image_data,
        media_type: content.image.media_type,
        type: "base64"
      }
    });
  }

  return entries;
}

module.exports = extractTextAndImageEntries;