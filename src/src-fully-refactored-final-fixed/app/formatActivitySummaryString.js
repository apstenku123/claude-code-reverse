/**
 * Generates a formatted summary string by concatenating the provided source, config, and subscription values
 * with a sorted, stringified representation of the input object (with undefined keys removed).
 *
 * @param {string} sourceObservable - The source observable or identifier (originally 'a').
 * @param {string} config - The configuration or activity status (originally 'createPropertyAccessor').
 * @param {string} subscription - The subscription or random value (originally 'deepCloneWithCycleDetection').
 * @param {Object} inputObject - The object to process: undefined keys will be dropped, then entries sorted and stringified (originally 'createObjectTracker').
 * @returns {string} The concatenated summary string.
 */
function formatActivitySummaryString(sourceObservable, config, subscription, inputObject) {
  // Remove keys with undefined values from the input object
  const filteredObject = D19.dropUndefinedKeys(inputObject);

  // Convert the filtered object to an array of [key, value] pairs
  const entries = Object.entries(filteredObject);

  // Sort the entries alphabetically by key
  const sortedEntries = entries.sort((firstEntry, secondEntry) => firstEntry[0].localeCompare(secondEntry[0]));

  // Stringify the sorted entries array
  const sortedEntriesString = String(sortedEntries);

  // Concatenate all parts into the final summary string
  return `${sourceObservable}${config}${subscription}${sortedEntriesString}`;
}

module.exports = formatActivitySummaryString;