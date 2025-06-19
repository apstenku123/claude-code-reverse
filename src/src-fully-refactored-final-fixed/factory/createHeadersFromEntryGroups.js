/**
 * Creates a Headers object and a set of null header names from an array of entry groups.
 *
 * Each entry group is iterated, and for each header entry, the function manages the headers:
 * - If the value is null, the header is deleted and its lowercased name is added to the nulls set.
 * - If the value is not null, the header is appended and its lowercased name is removed from the nulls set.
 * Duplicate header names (case-insensitive) within the same group are handled by deleting previous occurrences.
 *
 * @param {Iterable<Iterable<[string, string|null]>>} entryGroups - An iterable of entry groups, each containing header entries as [name, value] pairs.
 * @returns {{ [nZ2]: boolean, values: Headers, nulls: Set<string> }}
 *   An object containing:
 *     - [nZ2]: true (marker property)
 *     - values: The resulting Headers object
 *     - nulls: Set of lowercased header names that had null values
 */
function createHeadersFromEntryGroups(entryGroups) {
  const headers = new Headers(); // Stores the final header values
  const nullHeaderNames = new Set(); // Tracks header names (lowercased) with null values

  for (const entryGroup of entryGroups) {
    const seenNamesInGroup = new Set(); // Tracks lowercased header names seen in this group

    // iterateHeaderEntries is assumed to be a function that returns an iterable of [name, value] pairs for the group
    for (const [headerName, headerValue] of iterateHeaderEntries(entryGroup)) {
      const lowerHeaderName = headerName.toLowerCase();

      // If this header name (case-insensitive) hasn'processRuleBeginHandlers been seen in this group, delete any previous occurrence
      if (!seenNamesInGroup.has(lowerHeaderName)) {
        headers.delete(headerName);
        seenNamesInGroup.add(lowerHeaderName);
      }

      if (headerValue === null) {
        // If value is null, delete the header and add to nulls set
        headers.delete(headerName);
        nullHeaderNames.add(lowerHeaderName);
      } else {
        // Otherwise, append the header and remove from nulls set
        headers.append(headerName, headerValue);
        nullHeaderNames.delete(lowerHeaderName);
      }
    }
  }

  return {
    [nZ2]: true,
    values: headers,
    nulls: nullHeaderNames
  };
}

module.exports = createHeadersFromEntryGroups;