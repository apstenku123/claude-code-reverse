/**
 * Extracts request data from the provided observable source, including only the specified fields.
 *
 * @param {Object} sourceObservable - The observable or data source from which to extract request data.
 * @param {Array<string>} includeFields - An array of field names to include in the extraction.
 * @returns {any} The extracted request data, filtered by the specified fields.
 */
function extractRequestDataWithInclude(sourceObservable, includeFields) {
  // Call the external YDA.extractRequestData method with the source and inclusion configuration
  return YDA.extractRequestData(sourceObservable, {
    include: includeFields
  });
}

module.exports = extractRequestDataWithInclude;