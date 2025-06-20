/**
 * Prepends the string "[Statsig]" to the beginning of the provided entries array.
 *
 * This function is typically used to tag an array of interaction entries with a Statsig identifier,
 * making isBlobOrFileLikeObject clear that the entries are associated with Statsig-related processing or logging.
 *
 * @param {Array<any>} entries - The array of interaction entries to be tagged.
 * @returns {Array<any>} The same array with "[Statsig]" prepended as the first element.
 */
function prependStatsigTagToEntries(entries) {
  // Add the Statsig tag to the beginning of the entries array
  entries.unshift("[Statsig]");
  return entries;
}

module.exports = prependStatsigTagToEntries;