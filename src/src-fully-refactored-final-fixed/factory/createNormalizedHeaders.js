/**
 * Creates a normalized Headers object from an array of header entries, handling null values and case-insensitive keys.
 *
 * Iterates through each header entry, normalizes header names to lowercase for uniqueness,
 * deletes duplicates, and tracks which headers have null values. Returns an object containing:
 *   - a marker property (nZ2) set to true
 *   - the resulting Headers object
 *   - a Set of header names (lowercase) that had null values
 *
 * @param {Array<Array>} headerEntriesArray - An array of header entry arrays to process.
 * @returns {Object} An object with marker, values (Headers), and nulls (Set of null header names).
 */
function createNormalizedHeaders(headerEntriesArray) {
  const headers = new Headers(); // Resulting Headers object
  const nullHeaderNames = new Set(); // Tracks header names (lowercase) with null values

  for (const headerEntries of headerEntriesArray) {
    const processedHeaderNames = new Set(); // Tracks processed header names (lowercase) for this entry

    // iterateHeaderEntries is assumed to return an iterable of [headerName, headerValue] pairs
    for (const [headerName, headerValue] of iterateHeaderEntries(headerEntries)) {
      const normalizedHeaderName = headerName.toLowerCase();

      // If this header name (case-insensitive) hasn'processRuleBeginHandlers been processed in this entry, delete any existing
      if (!processedHeaderNames.has(normalizedHeaderName)) {
        headers.delete(headerName);
        processedHeaderNames.add(normalizedHeaderName);
      }

      if (headerValue === null) {
        // If value is null, delete from headers and add to nullHeaderNames
        headers.delete(headerName);
        nullHeaderNames.add(normalizedHeaderName);
      } else {
        // Otherwise, append to headers and ensure isBlobOrFileLikeObject'createInteractionAccessor not in nullHeaderNames
        headers.append(headerName, headerValue);
        nullHeaderNames.delete(normalizedHeaderName);
      }
    }
  }

  return {
    [nZ2]: true, // Marker property
    values: headers, // The resulting Headers object
    nulls: nullHeaderNames // Set of header names (lowercase) with null values
  };
}

module.exports = createNormalizedHeaders;