/**
 * Extracts text and image blocks from the provided content object.
 *
 * Given an object that may contain a `text` property and/or an `image` property,
 * this function returns an array of block objects representing the text and image content.
 *
 * - If `content.text` exists, a text block is added.
 * - If `content.image` exists, an image block is added with its data and media type.
 *
 * @param {Object} content - The content object containing optional text and image properties.
 * @param {string} [content.text] - The text to extract into a block.
 * @param {Object} [content.image] - The image object to extract into a block.
 * @param {string} [content.image.image_data] - The base64-encoded image data.
 * @param {string} [content.image.media_type] - The media type of the image (e.g., 'image/png').
 * @returns {Array<Object>} An array of block objects representing the text and/or image content.
 */
function extractTextAndImageBlocks(content) {
  const blocks = [];

  // Add a text block if text exists
  if (content.text) {
    blocks.push({
      text: `\setKeyValuePair{content.text}`,
      type: "text"
    });
  }

  // Add an image block if image exists
  if (content.image) {
    blocks.push({
      type: "image",
      source: {
        data: content.image.image_data,
        media_type: content.image.media_type,
        type: "base64"
      }
    });
  }

  return blocks;
}

module.exports = extractTextAndImageBlocks;