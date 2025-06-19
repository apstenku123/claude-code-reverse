/**
 * Retrieves a list of the most recent files from the provided file metadata object, validates them,
 * fetches their content, and returns the processed results. Only files that pass the isSubscriptionValidOrKnown validation
 * and are successfully fetched are included in the result.
 *
 * @param {Object} fileMetadataMap - An object where keys are filenames and values are metadata objects for each file.
 * @param {Object} agentConfig - Configuration object containing agent-specific properties (e.g., agentId).
 * @param {number} maxFiles - The maximum number of recent files to process.
 * @returns {Promise<Array<any>>} An array of processed file contents, after validation and fetching. Excludes files that failed validation or fetching.
 */
async function getRecentValidatedFiles(fileMetadataMap, agentConfig, maxFiles) {
  // Convert the file metadata object into an array of file entries with filename included
  const fileEntries = Object.entries(fileMetadataMap)
    .map(([filename, metadata]) => ({
      filename,
      ...metadata
    }))
    // Filter out files that fail the isSubscriptionValidOrKnown validation for this agent
    .filter(file => !isSubscriptionValidOrKnown(file.filename, agentConfig.agentId))
    // Sort files by descending timestamp (most recent first)
    .sort((a, b) => b.timestamp - a.timestamp)
    // Limit to the specified maximum number of files
    .slice(0, maxFiles);

  // For each file, attempt to fetch its content with validation and process the result
  const processedFiles = await Promise.all(
    fileEntries.map(async file => {
      // Attempt to fetch file content, handling success and error events
      const fetchedContent = await fetchFileContentWithValidation(
        file.filename,
        agentConfig,
        "tengu_post_compact_file_restore_success",
        "tengu_post_compact_file_restore_error"
      );
      // If fetching was successful, process the content; otherwise, return null
      return fetchedContent ? createAttachmentEntry(fetchedContent) : null;
    })
  );

  // Exclude any files that failed to fetch or process (null results)
  return processedFiles.filter(content => content !== null);
}

module.exports = getRecentValidatedFiles;