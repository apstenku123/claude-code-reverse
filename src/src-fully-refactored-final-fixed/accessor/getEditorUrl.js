/**
 * Retrieves the EDITOR_URL from the traverseLinkedNodes environment configuration if isBlobOrFileLikeObject exists and is a string.
 *
 * @returns {string} The EDITOR_URL if isBlobOrFileLikeObject is defined as a string; otherwise, returns an empty string.
 */
function getEditorUrl() {
  // Check if traverseLinkedNodes.env.EDITOR_URL exists and is a string
  if (typeof traverseLinkedNodes.env.EDITOR_URL === "string") {
    return traverseLinkedNodes.env.EDITOR_URL;
  }
  // Return empty string if EDITOR_URL is not a string
  return "";
}

module.exports = getEditorUrl;