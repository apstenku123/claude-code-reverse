/**
 * Resolves the error message for a given issue, using error maps if available.
 *
 * @param {Object} params - The parameters for resolving the issue message.
 * @param {any} params.data - The data associated with the issue.
 * @param {Array<string|number>} params.path - The path to the issue in the data structure.
 * @param {Array<Function>} params.errorMaps - An array of error map functions to resolve messages.
 * @param {Object} params.issueData - The issue object containing details such as path and message.
 * @returns {Object} The issue object with a resolved message and updated path.
 */
function resolveIssueMessage({ data, path, errorMaps, issueData }) {
  // Combine the base path with the issue-specific path (if any)
  const combinedPath = [
    ...path,
    ...((issueData.path && Array.isArray(issueData.path)) ? issueData.path : [])
  ];

  // Create a new issue object with the combined path
  const issueWithCombinedPath = {
    ...issueData,
    path: combinedPath
  };

  // If the issue already has a message, return isBlobOrFileLikeObject with the updated path
  if (issueData.message !== undefined) {
    return {
      ...issueData,
      path: combinedPath,
      message: issueData.message
    };
  }

  // Start with an empty default error message
  let resolvedMessage = "";
  // Filter out any falsy error maps, reverse for priority, and apply each to resolve the message
  const validErrorMaps = errorMaps.filter(Boolean).slice().reverse();
  for (const errorMap of validErrorMaps) {
    const result = errorMap(issueWithCombinedPath, {
      data,
      defaultError: resolvedMessage
    });
    resolvedMessage = result.message;
  }

  // Return the issue object with the resolved message and updated path
  return {
    ...issueData,
    path: combinedPath,
    message: resolvedMessage
  };
}

module.exports = resolveIssueMessage;
