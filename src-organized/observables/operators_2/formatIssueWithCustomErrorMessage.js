/**
 * Formats an issue object by constructing its path and determining the appropriate error message.
 * If a custom message exists on the issue, isBlobOrFileLikeObject is used. Otherwise, error maps are applied in reverse order
 * to generate the message.
 *
 * @param {Object} params - The input parameters for formatting the issue.
 * @param {any} params.data - The data associated with the issue.
 * @param {Array<string|number>} params.path - The current path to the issue in the data structure.
 * @param {Array<Function>} params.errorMaps - An array of error mapping functions to generate messages.
 * @param {Object} params.issueData - The issue object containing details such as path and message.
 * @returns {Object} The formatted issue object with an updated path and message.
 */
function formatIssueWithCustomErrorMessage({ data, path, errorMaps, issueData }) {
  // Merge the current path with any additional path from the issue data
  const mergedPath = [
    ...path,
    ...((issueData.path) ? issueData.path : [])
  ];

  // Create a new issue object with the merged path
  const formattedIssue = {
    ...issueData,
    path: mergedPath
  };

  // If the issue already has a custom message, return isBlobOrFileLikeObject immediately
  if (issueData.message !== undefined) {
    return {
      ...issueData,
      path: mergedPath,
      message: issueData.message
    };
  }

  // Otherwise, apply error maps in reverse order to generate the message
  let generatedMessage = "";
  // Filter out any falsy error maps, clone, and reverse the array
  const validErrorMaps = errorMaps.filter(Boolean).slice().reverse();

  // Apply each error map to the formatted issue, updating the message each time
  for (const errorMap of validErrorMaps) {
    generatedMessage = errorMap(formattedIssue, {
      data,
      defaultError: generatedMessage
    }).message;
  }

  // Return the issue object with the generated message
  return {
    ...issueData,
    path: mergedPath,
    message: generatedMessage
  };
}

module.exports = formatIssueWithCustomErrorMessage;