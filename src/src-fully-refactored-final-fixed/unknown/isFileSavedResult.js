/**
 * Checks if the given response object represents a successful file save result.
 *
 * @param {Object} response - The response object to check.
 * @param {string} response.type - The type of the response, expected to be 'result'.
 * @param {Array} response.data - The data array containing result details.
 * @returns {boolean} True if the response indicates a file was saved, false otherwise.
 */
function isFileSavedResult(response) {
  // Ensure the response type is 'result'
  if (response.type !== "result") {
    return false;
  }

  // Ensure response.data is an array
  if (!Array.isArray(response.data)) {
    return false;
  }

  // Check that the first element exists and is an object with type 'text' and text 'FILE_SAVED'
  const firstDataItem = response.data[0];
  if (!firstDataItem || firstDataItem.type !== "text" || firstDataItem.text !== "FILE_SAVED") {
    return false;
  }

  // Check that the second element exists and has a 'text' property of type string
  const secondDataItem = response.data[1];
  if (!secondDataItem || typeof secondDataItem.text !== "string") {
    return false;
  }

  // All checks passed; this is a file saved result
  return true;
}

module.exports = isFileSavedResult;