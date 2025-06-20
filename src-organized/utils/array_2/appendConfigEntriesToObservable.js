/**
 * Appends a formatted string of configuration entries to an array of mapped interactions.
 *
 * @param {Array} mappedInteractions - Array of mapped user interaction entries (from mapInteractionsToRouteNames).
 * @param {Object} config - Configuration object whose entries will be formatted and appended.
 * @returns {Array} a new array containing all mapped interactions, plus a string of formatted config entries.
 */
function appendConfigEntriesToObservable(mappedInteractions, config) {
  // Convert config object entries to an array of formatted strings: 'key: value'
  const formattedConfigEntries = Object.entries(config)
    .map(([subscription, value]) => `${subscription}: ${value}`)
    .join('\n'); // Join each entry with a newline

  // Return a new array with all mapped interactions and the formatted config string appended
  return [
    ...mappedInteractions,
    formattedConfigEntries
  ];
}

module.exports = appendConfigEntriesToObservable;