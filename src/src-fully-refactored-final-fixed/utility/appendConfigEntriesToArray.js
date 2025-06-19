/**
 * Appends a formatted string of configuration entries to the end of a given array.
 *
 * Each entry in the config object is converted to a string in the format 'key: value',
 * joined by a newline character, and then appended as a single string element to the array.
 *
 * @param {Array} interactionEntries - The array of interaction entries to which the config summary will be appended.
 * @param {Object} config - An object containing configuration key-value pairs to be formatted and appended.
 * @returns {Array} a new array containing all original interaction entries, with the formatted config summary appended as the last element.
 */
function appendConfigEntriesToArray(interactionEntries, config) {
  // Convert each key-value pair in the config object to a 'key: value' string
  const formattedConfigEntries = Object.entries(config)
    .map(([subscription, value]) => `${subscription}: ${value}`)
    .join('\n'); // Join all entries with a newline character

  // Return a new array with the formatted config summary appended
  return [
    ...interactionEntries,
    formattedConfigEntries
  ];
}

module.exports = appendConfigEntriesToArray;