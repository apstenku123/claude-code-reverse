/**
 * Checks if the provided array contains at least one entry.
 *
 * @param {Array} entries - The array of entries to check.
 * @returns {boolean} True if the array has one or more entries, false otherwise.
 */
const hasAtLeastOneEntry = (entries) => {
  // Return true if the array has at least one element
  return entries.length >= 1;
};

module.exports = hasAtLeastOneEntry;