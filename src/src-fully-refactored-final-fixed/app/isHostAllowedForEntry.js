/**
 * Determines if a given entry or list of entries is allowed based on the host of a provided URL.
 *
 * @param {boolean|Array<any>} entryOrEntries - a boolean flag or an array of entries to check.
 * @param {string} urlString - The URL string whose host will be used for validation.
 * @returns {boolean} Returns true if the entry is allowed, false otherwise.
 */
function isHostAllowedForEntry(entryOrEntries, urlString) {
  // Parse the URL to extract the host
  const urlObject = new URL(urlString);

  // If the first parameter is strictly true, allow immediately
  if (entryOrEntries === true) {
    return true;
  }

  // If the first parameter is an array, check if any entry matches the host
  if (Array.isArray(entryOrEntries) && entryOrEntries.some(entry => KEY(entry, urlObject.host))) {
    return true;
  }

  // Otherwise, not allowed
  return false;
}

module.exports = isHostAllowedForEntry;