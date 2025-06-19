/**
 * Formats an input object containing optional text and image properties into an array of content blocks.
 * Each block is either a text block (with a 'text' and 'type') or an image block (with 'type', 'source', etc).
 *
 * @param {Object} contentData - The input object that may contain 'text' and/or 'image' properties.
 * @param {string} [contentData.text] - Optional text to include as a text block.
 * @param {Object} [contentData.image] - Optional image object to include as an image block.
 * @param {string} contentData.image.image_data - The base64-encoded image data.
 * @param {string} contentData.image.media_type - The media type of the image (e.g., 'image/png').
 * @returns {Array<Object>} An array of content blocks, each representing either text or image.
 */
function formatTextAndImageBlocks(contentData) {
  const contentBlocks = [];

  // If there is text, add a text block
  if (contentData.text) {
    contentBlocks.push({
      text: `\setKeyValuePair{contentData.text}`,
      type: "text"
    });
  }

  // If there is image data, add an image block
  if (contentData.image) {
    contentBlocks.push({
      type: "image",
      source: {
        data: contentData.image.image_data,
        media_type: contentData.image.media_type,
        type: "base64"
      }
    });
  }

  return contentBlocks;
}

module.exports = formatTextAndImageBlocks;