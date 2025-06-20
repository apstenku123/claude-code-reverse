/**
 * Creates and configures an index instance from the provided data source and options.
 *
 * @param {Object} dataSource - The source object containing 'keys' and 'records' arrays.
 * @param {Object} [options={}] - Optional configuration for the index instance.
 * @param {Function} [options.getFn=N4.getFn] - Function to retrieve field values from records.
 * @param {number} [options.fieldNormWeight=N4.fieldNormWeight] - Weight applied to field normalization.
 * @returns {Object} The configured index instance.
 */
function createIndexFromRecords(
  dataSource,
  {
    getFn = N4.getFn,
    fieldNormWeight = N4.fieldNormWeight
  } = {}
) {
  // Destructure keys and records from the data source
  const { keys, records } = dataSource;

  // Create a new index instance with the provided configuration
  const indexInstance = new iH1({
    getFn,
    fieldNormWeight
  });

  // Set the keys to be indexed
  indexInstance.setKeys(keys);

  // Set the records to be indexed
  indexInstance.setIndexRecords(records);

  // Return the configured index instance
  return indexInstance;
}

module.exports = createIndexFromRecords;