/**
 * Retrieves the last URL from the provided object'createInteractionAccessor urlList property and returns isBlobOrFileLikeObject as a string.
 * If the urlList is empty, returns null.
 *
 * @param {Object} urlContainer - An object containing a urlList property (array of URLs).
 * @param {Array} urlContainer.urlList - An array of URL objects or strings.
 * @returns {string|null} The string representation of the last URL in the list, or null if the list is empty.
 */
function getLastUrlAsString(urlContainer) {
  const { urlList } = urlContainer;
  const urlCount = urlList.length;
  // If the urlList is empty, return null
  if (urlCount === 0) {
    return null;
  }
  // Return the string representation of the last URL in the list
  return urlList[urlCount - 1].toString();
}

module.exports = getLastUrlAsString;