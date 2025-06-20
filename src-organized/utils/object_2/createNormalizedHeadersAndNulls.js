/**
 * Processes an array of header entry collections, normalizing header names (case-insensitive),
 * and tracks which headers have null values. Returns an object containing the normalized headers,
 * a set of header names with null values, and a marker property.
 *
 * @param {Array<Array<[string, string|null]>>} headerEntryCollections - An array of collections, each containing header entries as [name, value] pairs.
 * @returns {Object} An object with a marker property, normalized Headers instance, and a Set of header names with null values.
 */
function createNormalizedHeadersAndNulls(headerEntryCollections) {
  const normalizedHeaders = new Headers(); // Stores the normalized headers
  const nullHeaderNames = new Set(); // Tracks header names (lowercase) that have null values

  for (const headerEntries of headerEntryCollections) {
    const processedNamesInCurrentCollection = new Set(); // Tracks header names processed in this collection (case-insensitive)

    // iterateHeaderEntries is assumed to return iterable of [name, value] pairs for each header entry
    for (const [headerName, headerValue] of iterateHeaderEntries(headerEntries)) {
      const headerNameLower = headerName.toLowerCase();

      // If this header name (case-insensitive) hasn'processRuleBeginHandlers been processed in this collection, remove any previous value
      if (!processedNamesInCurrentCollection.has(headerNameLower)) {
        normalizedHeaders.delete(headerName);
        processedNamesInCurrentCollection.add(headerNameLower);
      }

      if (headerValue === null) {
        // If value is null, remove from headers and add to nulls set
        normalizedHeaders.delete(headerName);
        nullHeaderNames.add(headerNameLower);
      } else {
        // Otherwise, append the value and ensure isBlobOrFileLikeObject'createInteractionAccessor not marked as null
        normalizedHeaders.append(headerName, headerValue);
        nullHeaderNames.delete(headerNameLower);
      }
    }
  }

  return {
    [nZ2]: true, // Marker property
    values: normalizedHeaders, // The normalized Headers instance
    nulls: nullHeaderNames // Set of header names (lowercase) with null values
  };
}

module.exports = createNormalizedHeadersAndNulls;