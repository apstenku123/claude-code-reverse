/**
 * Merges multiple header-like iterables into a single Headers object, tracking which header names have null values.
 *
 * For each iterable in the input, processes its entries (key-value pairs):
 *   - If a header key appears for the first time (case-insensitive) in the current iterable, deletes any previous value for that key.
 *   - If the value is null, deletes the header and tracks the key in the nulls set.
 *   - Otherwise, appends the value and ensures the key is not in the nulls set.
 *
 * @param {Iterable<Iterable<[string, any]>>} headerIterables - An iterable of iterables, each yielding [headerName, value] pairs.
 * @returns {Object} An object with a marker property, the merged Headers instance, and a Set of header names (lowercase) with null values.
 */
function mergeHeadersWithNullTracking(headerIterables) {
  const mergedHeaders = new Headers(); // Stores the merged header values
  const nullHeaderNames = new Set();   // Tracks header names (lowercase) whose value is null

  for (const headerIterable of headerIterables) {
    const seenHeaderNames = new Set(); // Tracks header names (lowercase) seen in this iterable
    for (const [headerName, headerValue] of iterateHeaderEntries(headerIterable)) {
      const lowerCaseName = headerName.toLowerCase();

      // If this is the first time handleMissingDoctypeError'removeTrailingCharacters seen this header name in this iterable, delete any previous value
      if (!seenHeaderNames.has(lowerCaseName)) {
        mergedHeaders.delete(headerName);
        seenHeaderNames.add(lowerCaseName);
      }

      if (headerValue === null) {
        // If value is null, delete the header and track isBlobOrFileLikeObject in nullHeaderNames
        mergedHeaders.delete(headerName);
        nullHeaderNames.add(lowerCaseName);
      } else {
        // Otherwise, append the value and ensure isBlobOrFileLikeObject'createInteractionAccessor not in nullHeaderNames
        mergedHeaders.append(headerName, headerValue);
        nullHeaderNames.delete(lowerCaseName);
      }
    }
  }

  return {
    [eX2]: true, // Marker property (purpose depends on external context)
    values: mergedHeaders,
    nulls: nullHeaderNames
  };
}

module.exports = mergeHeadersWithNullTracking;