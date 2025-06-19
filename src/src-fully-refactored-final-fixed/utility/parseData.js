/**
 * Parses the provided data source using the specified configuration.
 *
 * This utility function delegates parsing to the external 'bj.parse' method.
 *
 * @param {string} dataSource - The data to be parsed.
 * @param {object} parseConfig - Configuration options for parsing.
 * @returns {string} The parsed data as a string.
 */
function parseData(dataSource, parseConfig) {
  // Delegate parsing to the external 'bj.parse' utility
  return bj.parse(dataSource, parseConfig);
}

module.exports = parseData;