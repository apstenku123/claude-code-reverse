/**
 * Determines if the input string is a base64-encoded image, and if not, truncates the string if isBlobOrFileLikeObject exceeds a maximum length.
 * Returns the total number of lines, a possibly truncated version of the content, and whether the content is an image.
 *
 * @param {string} content - The string content to analyze and possibly truncate.
 * @returns {{ totalLines: number, truncatedContent: string, isImage: boolean }}
 *   An object containing:
 *     - totalLines: The total number of lines in the original content
 *     - truncatedContent: The original or truncated content
 *     - isImage: True if the content is a base64-encoded image, otherwise false
 */
function getTruncatedTextWithImageDetection(content) {
  // Check if content is a base64-encoded image data URL
  const isImage = /^data:image\/[a-zA-Z0-9.+_-]+;base64,/i.test(content);
  if (isImage) {
    return {
      totalLines: 1,
      truncatedContent: content,
      isImage
    };
  }

  // Get the maximum allowed content length
  const maxLength = getMaxBashOutputLength();

  // If content is within the allowed length, return as is with line count
  if (content.length <= maxLength) {
    return {
      totalLines: content.split('\n').length,
      truncatedContent: content,
      isImage
    };
  }

  // Truncate content to maxLength, count number of truncated lines
  const truncatedContent = content.slice(0, maxLength);
  const truncatedLinesCount = content.slice(maxLength).split('\n').length;
  const truncatedDisplay = `${truncatedContent}\n\n... [${truncatedLinesCount} lines truncated] ...`;

  return {
    totalLines: content.split('\n').length,
    truncatedContent: truncatedDisplay,
    isImage
  };
}

module.exports = getTruncatedTextWithImageDetection;