/**
 * Creates and configures an indexed record set using provided keys and records.
 *
 * @param {Object} sourceData - The source object containing keys and records.
 * @param {Object} [options] - Optional configuration for the indexed record set.
 * @param {Function} [options.getFn=N4.getFn] - Function to retrieve values from records.
 * @param {number} [options.fieldNormWeight=N4.fieldNormWeight] - Weight for field normalization.
 * @returns {iH1} Configured indexed record set instance.
 */
function createIndexedRecordSet(
  sourceData,
  {
    getFn = N4.getFn,
    fieldNormWeight = N4.fieldNormWeight
  } = {}
) {
  // Destructure keys and records from the source data
  const { keys, records } = sourceData;

  // Create a new indexed record set instance with the provided configuration
  const indexedRecordSet = new iH1({
    getFn,
    fieldNormWeight
  });

  // Set the keys for the indexed record set
  indexedRecordSet.setKeys(keys);

  // Set the records for the indexed record set
  indexedRecordSet.setIndexRecords(records);

  // Return the configured indexed record set instance
  return indexedRecordSet;
}

module.exports = createIndexedRecordSet;