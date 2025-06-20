/**
 * Processes an array of header entry sets, aggregating their values into a single Headers object and tracking nullified header keys.
 *
 * For each entry set, this function iterates through its header entries, updating the Headers object accordingly:
 * - If a header value is null, the header is deleted and its key is tracked in the nullHeaderKeys set.
 * - If a header value is not null, the header is appended and any previous null tracking for its key is removed.
 * - Duplicate header keys (case-insensitive) within the same entry set are handled by deleting the header before adding the new value.
 *
 * @param {Iterable<Iterable<[string, string|null]>>} headerEntrySets - An iterable of header entry sets, each being an iterable of [headerName, headerValue] pairs. Header values may be null.
 * @returns {Object} An object containing:
 *   - [nZ2]: true (marker property)
 *   - values: Headers object with aggregated header values
 *   - nulls: Set of lowercased header names that were set to null
 */
function processHeaderEntrySets(headerEntrySets) {
  const aggregatedHeaders = new Headers(); // Aggregated headers
  const nullHeaderKeys = new Set();        // Tracks header keys set to null (lowercased)

  for (const entrySet of headerEntrySets) {
    const processedKeysInSet = new Set(); // Tracks lowercased keys processed in this entry set

    // iterateHeaderEntries(entrySet) yields [headerName, headerValue] pairs
    for (const [headerName, headerValue] of iterateHeaderEntries(entrySet)) {
      const lowerCaseKey = headerName.toLowerCase();

      // If this key hasn'processRuleBeginHandlers been processed in this set, delete any existing header (case-insensitive deduplication)
      if (!processedKeysInSet.has(lowerCaseKey)) {
        aggregatedHeaders.delete(headerName);
        processedKeysInSet.add(lowerCaseKey);
      }

      if (headerValue === null) {
        // If value is null, delete header and track in nullHeaderKeys
        aggregatedHeaders.delete(headerName);
        nullHeaderKeys.add(lowerCaseKey);
      } else {
        // Otherwise, append header and remove from nullHeaderKeys
        aggregatedHeaders.append(headerName, headerValue);
        nullHeaderKeys.delete(lowerCaseKey);
      }
    }
  }

  return {
    [nZ2]: true,
    values: aggregatedHeaders,
    nulls: nullHeaderKeys
  };
}

module.exports = processHeaderEntrySets;