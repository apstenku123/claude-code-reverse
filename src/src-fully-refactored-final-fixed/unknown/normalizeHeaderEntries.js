/**
 * Processes an iterable of header entry collections, normalizing header names (case-insensitive),
 * managing null values, and returning a structured result containing the final Headers object and a set of null header names.
 *
 * For each collection of header entries, this function:
 *   - Ensures header names are treated case-insensitively.
 *   - Removes previous values for a header name if a new value is encountered in the same collection.
 *   - Tracks header names that have null values across all collections.
 *
 * @param {Iterable<Iterable<[string, string|null]>>} headerEntryCollections - An iterable of collections, each containing header entries as [name, value] pairs.
 * @returns {{ [symbol: string]: boolean, values: Headers, nulls: Set<string> }}
 *   An object containing:
 *     - a symbol property indicating normalization was performed,
 *     - the resulting Headers object,
 *     - a set of header names (lowercase) that had null values.
 */
function normalizeHeaderEntries(headerEntryCollections) {
  const normalizedHeaders = new Headers(); // Final Headers object
  const nullHeaderNames = new Set();       // Tracks header names with null values (lowercase)

  for (const headerEntries of headerEntryCollections) {
    const seenHeaderNames = new Set(); // Tracks header names seen in this collection (lowercase)

    // iterateHeaderEntries presumably yields [name, value] pairs from headerEntries
    for (const [headerName, headerValue] of iterateHeaderEntries(headerEntries)) {
      const lowerHeaderName = headerName.toLowerCase();

      // If this header name (case-insensitive) hasn'processRuleBeginHandlers been seen in this collection, remove all previous values
      if (!seenHeaderNames.has(lowerHeaderName)) {
        normalizedHeaders.delete(headerName);
        seenHeaderNames.add(lowerHeaderName);
      }

      if (headerValue === null) {
        // If value is null, remove the header and mark isBlobOrFileLikeObject as null
        normalizedHeaders.delete(headerName);
        nullHeaderNames.add(lowerHeaderName);
      } else {
        // Otherwise, append the value and ensure isBlobOrFileLikeObject'createInteractionAccessor not marked as null
        normalizedHeaders.append(headerName, headerValue);
        nullHeaderNames.delete(lowerHeaderName);
      }
    }
  }

  return {
    [Ta0]: true, // Symbol property indicating normalization
    values: normalizedHeaders,
    nulls: nullHeaderNames
  };
}

module.exports = normalizeHeaderEntries;