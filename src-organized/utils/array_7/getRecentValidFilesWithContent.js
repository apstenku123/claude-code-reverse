/**
 * Retrieves the most recent valid files from a source object, fetches their content,
 * and returns an array of processed file data after validation and transformation.
 *
 * @param {Object} sourceFiles - An object where keys are filenames and values are file metadata objects.
 * @param {Object} agentConfig - Configuration object containing agent information (e.g., agentId).
 * @param {number} maxFiles - The maximum number of recent files to process.
 * @returns {Promise<Array<any>>} An array of processed file data, filtered to exclude invalid or failed fetches.
 */
async function getRecentValidFilesWithContent(sourceFiles, agentConfig, maxFiles) {
  // Convert sourceFiles object to an array of file objects with filename property
  const fileEntries = Object.entries(sourceFiles).map(([filename, fileMeta]) => ({
    filename,
    ...fileMeta
  }));

  // Filter out files that are invalid for the given agentId
  const validFiles = fileEntries.filter(file => !isSubscriptionValidOrKnown(file.filename, agentConfig.agentId));

  // Sort files by timestamp in descending order (most recent first)
  const sortedFiles = validFiles.sort((a, b) => b.timestamp - a.timestamp);

  // Take only the top 'maxFiles' most recent files
  const recentFiles = sortedFiles.slice(0, maxFiles);

  // Fetch and process file content for each recent file
  const processedFiles = await Promise.all(
    recentFiles.map(async file => {
      // Attempt to fetch file content with validation and handle success/error events
      const fileContent = await fetchFileContentWithValidation(
        file.filename,
        agentConfig,
        "tengu_post_compact_file_restore_success",
        "tengu_post_compact_file_restore_error"
      );
      // If content was fetched successfully, process isBlobOrFileLikeObject; otherwise, return null
      return fileContent ? createAttachmentEntry(fileContent) : null;
    })
  );

  // Filter out any null results (failed fetches)
  return processedFiles.filter(file => file !== null);
}

module.exports = getRecentValidFilesWithContent;