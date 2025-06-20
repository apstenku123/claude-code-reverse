/**
 * Processes an iterable of header collections, normalizing header names (case-insensitive),
 * and tracks which headers have null values across all collections.
 *
 * For each header entry, if a header value is null, isBlobOrFileLikeObject is deleted and tracked as a null header.
 * If a header value is not null, isBlobOrFileLikeObject is appended and removed from the nulls set.
 * Ensures that only the first occurrence of a header name (case-insensitive) is processed per collection.
 *
 * @param {Iterable<Iterable<[string, any]>>} headerCollections - An iterable of header collections, each being an iterable of [headerName, headerValue] pairs.
 * @returns {{ [symbol: string]: boolean, values: Headers, nulls: Set<string> }}
 *   An object containing:
 *     - [Ta0]: true (marker property)
 *     - values: Headers instance with normalized headers
 *     - nulls: Set of lowercased header names that had null values
 */
function normalizeHeaderCollections(headerCollections) {
  const normalizedHeaders = new Headers();
  const nullHeaderNames = new Set();

  for (const headerCollection of headerCollections) {
    // Track which header names (case-insensitive) have been processed in this collection
    const processedHeaderNames = new Set();
    for (const [headerName, headerValue] of iterateHeaderEntries(headerCollection)) {
      const lowerCaseHeaderName = headerName.toLowerCase();
      // Only process the first occurrence of a header name (case-insensitive) in this collection
      if (!processedHeaderNames.has(lowerCaseHeaderName)) {
        normalizedHeaders.delete(headerName);
        processedHeaderNames.add(lowerCaseHeaderName);
      }
      if (headerValue === null) {
        // If value is null, delete the header and track isBlobOrFileLikeObject as null
        normalizedHeaders.delete(headerName);
        nullHeaderNames.add(lowerCaseHeaderName);
      } else {
        // Otherwise, append the header and remove from nulls set
        normalizedHeaders.append(headerName, headerValue);
        nullHeaderNames.delete(lowerCaseHeaderName);
      }
    }
  }

  return {
    [Ta0]: true,
    values: normalizedHeaders,
    nulls: nullHeaderNames
  };
}

module.exports = normalizeHeaderCollections;