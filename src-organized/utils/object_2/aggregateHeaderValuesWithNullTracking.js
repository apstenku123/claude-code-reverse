/**
 * Aggregates header values from multiple sources, tracking which headers are set to null.
 *
 * Iterates over an array of header entry sources, normalizes header names to lowercase,
 * and manages a Headers object with the latest non-null values. Tracks headers explicitly
 * set to null in a Set, and ensures only the most recent value for each header is kept.
 *
 * @param {Array<Iterable<[string, string|null]>>} headerEntrySources - An array of iterable sources, each yielding [headerName, headerValue] pairs. Header values may be null.
 * @returns {Object} An object containing:
 *   - [nZ2]: true (marker property)
 *   - values: Headers object with the latest non-null header values
 *   - nulls: Set of lowercased header names that were explicitly set to null
 */
function aggregateHeaderValuesWithNullTracking(headerEntrySources) {
  const aggregatedHeaders = new Headers(); // Stores the latest non-null header values
  const nullHeaderNames = new Set();       // Tracks header names set to null (lowercased)

  for (const headerEntries of headerEntrySources) {
    const processedHeaderNames = new Set(); // Tracks header names processed in this iteration (lowercased)

    // iterateHeaderEntries yields [headerName, headerValue] pairs for this source
    for (const [headerName, headerValue] of iterateHeaderEntries(headerEntries)) {
      const lowerCaseHeaderName = headerName.toLowerCase();

      // If this header name hasn'processRuleBeginHandlers been processed yet in this iteration, remove any previous value
      if (!processedHeaderNames.has(lowerCaseHeaderName)) {
        aggregatedHeaders.delete(headerName);
        processedHeaderNames.add(lowerCaseHeaderName);
      }

      if (headerValue === null) {
        // If value is null, remove from headers and track in nullHeaderNames
        aggregatedHeaders.delete(headerName);
        nullHeaderNames.add(lowerCaseHeaderName);
      } else {
        // Otherwise, append the value and ensure isBlobOrFileLikeObject'createInteractionAccessor not in nullHeaderNames
        aggregatedHeaders.append(headerName, headerValue);
        nullHeaderNames.delete(lowerCaseHeaderName);
      }
    }
  }

  return {
    [nZ2]: true, // Marker property as in original code
    values: aggregatedHeaders,
    nulls: nullHeaderNames
  };
}

module.exports = aggregateHeaderValuesWithNullTracking;