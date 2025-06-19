/**
 * Aggregates header values from multiple sources, handling nulls and duplicates.
 *
 * For each entry in the input array, this function processes header key-value pairs (via iterateHeaderEntries),
 * normalizes header names to lowercase, and manages their presence in the resulting Headers object.
 * If a header value is null, isBlobOrFileLikeObject is deleted from the Headers and tracked in the nullHeaders set.
 * Otherwise, isBlobOrFileLikeObject is appended to the Headers and removed from the nullHeaders set.
 * Ensures that duplicate header names (case-insensitive) are handled correctly.
 *
 * @param {Array<any>} headerEntryGroups - An array of header entry groups to process.
 * @returns {Object} An object containing:
 *   - [nZ2]: true (marker property)
 *   - values: Headers object with aggregated header values
 *   - nulls: Set of header names (lowercase) that had null values
 */
function aggregateHeaderValues(headerEntryGroups) {
  const aggregatedHeaders = new Headers(); // Stores the final aggregated header values
  const nullHeaders = new Set(); // Tracks header names (lowercase) that had null values

  for (const headerEntries of headerEntryGroups) {
    const processedHeaderNames = new Set(); // Tracks header names processed in this group (case-insensitive)

    // iterateHeaderEntries yields [headerName, headerValue] pairs for this group
    for (const [headerName, headerValue] of iterateHeaderEntries(headerEntries)) {
      const headerNameLower = headerName.toLowerCase();

      // If this header name (case-insensitive) hasn'processRuleBeginHandlers been processed in this group, delete any existing value
      if (!processedHeaderNames.has(headerNameLower)) {
        aggregatedHeaders.delete(headerName);
        processedHeaderNames.add(headerNameLower);
      }

      if (headerValue === null) {
        // If value is null, remove from headers and track as null
        aggregatedHeaders.delete(headerName);
        nullHeaders.add(headerNameLower);
      } else {
        // Otherwise, append the value and ensure isBlobOrFileLikeObject'createInteractionAccessor not tracked as null
        aggregatedHeaders.append(headerName, headerValue);
        nullHeaders.delete(headerNameLower);
      }
    }
  }

  return {
    [nZ2]: true,
    values: aggregatedHeaders,
    nulls: nullHeaders
  };
}

module.exports = aggregateHeaderValues;