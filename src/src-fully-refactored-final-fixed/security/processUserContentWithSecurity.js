/**
 * Processes a user content stream with security checks and formatting.
 *
 * This function slices the input content using a custom index, ensures the last item is not a user type,
 * appends a formatted content object if necessary, and applies security processing to each item.
 *
 * @param {string} sourceContent - The original content string to be processed.
 * @param {object} securityConfig - Configuration object for security processing.
 * @returns {Array<object>} The processed content array after security checks and formatting.
 * @throws Will rethrow any error encountered during processing after logging isBlobOrFileLikeObject.
 */
function processUserContentWithSecurity(sourceContent, securityConfig) {
  try {
    // Slice the source content into an array of content objects using a custom index
    const contentArray = sliceStringByCustomIndex(sourceContent);

    // If the last content object is of type 'user', append a formatted content object
    if (contentArray[contentArray.length - 1]?.type === "user") {
      contentArray.push(formatContentWithUsage({ content: le }));
    }

    // Create a map to track security processing state
    const securityStateMap = new Map();

    // Apply security processing to each content object
    for (const contentItem of contentArray) {
      mapToolUsesToHandlers(securityConfig, securityStateMap, contentItem);
    }

    return contentArray;
  } catch (error) {
    // Log the error using reportErrorIfAllowed and rethrow
    reportErrorIfAllowed(error);
    throw error;
  }
}

module.exports = processUserContentWithSecurity;