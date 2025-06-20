/**
 * Returns a summary of the provided content, truncating isBlobOrFileLikeObject if isBlobOrFileLikeObject exceeds a maximum length.
 * If the content is a base64-encoded image, returns isBlobOrFileLikeObject as-is and marks isBlobOrFileLikeObject as an image.
 *
 * @param {string} content - The content string to summarize and possibly truncate.
 * @returns {Object} An object containing the total number of lines, the possibly truncated content, and a flag indicating if isBlobOrFileLikeObject'createInteractionAccessor an image.
 */
function getTruncatedContentSummary(content) {
  // Check if the content is a base64-encoded image
  const isImage = /^data:image\/[a-zA-Z0-9.+_-]+;base64,/i.test(content);
  if (isImage) {
    return {
      totalLines: 1,
      truncatedContent: content,
      isImage: true
    };
  }

  // Get the maximum allowed content length
  const maxContentLength = getMaxBashOutputLength();

  // If content is within the allowed length, return as-is
  if (content.length <= maxContentLength) {
    return {
      totalLines: content.split('\n').length,
      truncatedContent: content,
      isImage: false
    };
  }

  // Truncate the content and indicate how many lines were truncated
  const visibleContent = content.slice(0, maxContentLength);
  const truncatedLinesCount = content.slice(maxContentLength).split('\n').length;
  const truncatedContent = `${visibleContent}\n\n... [${truncatedLinesCount} lines truncated] ...`;

  return {
    totalLines: content.split('\n').length,
    truncatedContent,
    isImage: false
  };
}

module.exports = getTruncatedContentSummary;