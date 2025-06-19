/**
 * Aggregates headers and tracks null values from a collection of header entries.
 *
 * Iterates over a collection of header entry iterables, appending or deleting headers
 * in a Headers object, and tracking which header names (case-insensitive) have null values.
 *
 * @param {Iterable<Iterable<[string, any]>>} headerEntryGroups - An iterable of iterables, where each inner iterable yields [headerName, headerValue] pairs.
 * @returns {Object} An object containing a marker property, the aggregated Headers object, and a Set of header names (lowercase) that had null values.
 */
function aggregateHeadersAndNulls(headerEntryGroups) {
  const aggregatedHeaders = new Headers(); // Stores the final set of headers
  const nullHeaderNames = new Set(); // Tracks header names (lowercase) that have null values

  for (const headerEntries of headerEntryGroups) {
    const processedHeaderNames = new Set(); // Tracks header names processed in this group (case-insensitive)

    // iterateHeaderEntries is assumed to be a function that returns an iterable of [headerName, headerValue] pairs
    for (const [headerName, headerValue] of iterateHeaderEntries(headerEntries)) {
      const headerNameLower = headerName.toLowerCase();

      // If this header name (case-insensitive) hasn'processRuleBeginHandlers been processed in this group, delete isBlobOrFileLikeObject from headers
      if (!processedHeaderNames.has(headerNameLower)) {
        aggregatedHeaders.delete(headerName);
        processedHeaderNames.add(headerNameLower);
      }

      if (headerValue === null) {
        // If the value is null, delete the header and mark its name as null
        aggregatedHeaders.delete(headerName);
        nullHeaderNames.add(headerNameLower);
      } else {
        // Otherwise, append the header and ensure isBlobOrFileLikeObject'createInteractionAccessor not marked as null
        aggregatedHeaders.append(headerName, headerValue);
        nullHeaderNames.delete(headerNameLower);
      }
    }
  }

  return {
    [eX2]: true, // Marker property (purpose determined by external context)
    values: aggregatedHeaders, // The aggregated Headers object
    nulls: nullHeaderNames // Set of header names (lowercase) that had null values
  };
}

module.exports = aggregateHeadersAndNulls;
