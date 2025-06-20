/**
 * Retrieves the last URL from the provided object'createInteractionAccessor urlList array.
 *
 * @param {Object} inputObject - An object containing a 'urlList' property, which is an array of URL-like objects.
 * @returns {string|null} The string representation of the last URL in the list, or null if the list is empty.
 */
function getLastUrlFromList(inputObject) {
  const { urlList } = inputObject;
  const urlCount = urlList.length;
  // If the urlList is empty, return null
  if (urlCount === 0) {
    return null;
  }
  // Return the string representation of the last URL in the list
  return urlList[urlCount - 1].toString();
}

module.exports = getLastUrlFromList;