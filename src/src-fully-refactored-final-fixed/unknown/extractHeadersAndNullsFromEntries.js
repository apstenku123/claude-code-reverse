/**
 * Extracts headers and tracks which header names have null values from a collection of entries.
 *
 * For each entry in the input iterable, this function processes its key-value pairs (using iterateHeaderEntries),
 * appending or deleting headers in a Headers object and tracking header names with null values in a Set.
 * Header names are compared case-insensitively.
 *
 * @param {Iterable<Iterable<[string, any]>>} entriesCollection - An iterable of entries, each of which is itself iterable of [headerName, value] pairs.
 * @returns {Object} An object containing:
 *   - [Ta0]: true (marker property)
 *   - values: Headers object with the final set of headers
 *   - nulls: Set of lowercased header names that had null values
 */
function extractHeadersAndNullsFromEntries(entriesCollection) {
  const headers = new Headers(); // Stores the final set of headers
  const nullHeaderNames = new Set(); // Tracks header names (lowercased) that have null values

  for (const entry of entriesCollection) {
    const processedHeaderNames = new Set(); // Tracks header names processed in this entry (case-insensitive)
    for (const [headerName, headerValue] of iterateHeaderEntries(entry)) {
      const lowerHeaderName = headerName.toLowerCase();
      // If this header name (case-insensitive) hasn'processRuleBeginHandlers been processed in this entry, delete isBlobOrFileLikeObject from headers
      if (!processedHeaderNames.has(lowerHeaderName)) {
        headers.delete(headerName);
        processedHeaderNames.add(lowerHeaderName);
      }
      if (headerValue === null) {
        // If value is null, delete from headers and add to nullHeaderNames
        headers.delete(headerName);
        nullHeaderNames.add(lowerHeaderName);
      } else {
        // Otherwise, append to headers and ensure isBlobOrFileLikeObject'createInteractionAccessor not in nullHeaderNames
        headers.append(headerName, headerValue);
        nullHeaderNames.delete(lowerHeaderName);
      }
    }
  }

  return {
    [Ta0]: true,
    values: headers,
    nulls: nullHeaderNames
  };
}

module.exports = extractHeadersAndNullsFromEntries;