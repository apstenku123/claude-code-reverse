/**
 * Processes the given data using its primary key and an optional configuration.
 *
 * @param {Object} data - The data object to process.
 * @param {Object} [options] - Optional configuration for processing.
 * @returns {*} The result of processing the data with its primary key and options.
 */
function processWithPrimaryKey(data, options) {
  // Retrieve the primary key from the data object
  const primaryKey = pk(data);
  // Process the data using the primary key and options
  return createM7Instance(data, primaryKey, options);
}

module.exports = processWithPrimaryKey;