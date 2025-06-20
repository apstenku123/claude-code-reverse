/**
 * Extracts headers and tracks keys with null values from a collection of header entry iterables.
 *
 * For each iterable in the input collection, this function processes its entries (key-value pairs),
 * normalizes header keys to lowercase for deduplication, and manages a Headers object and a Set of null keys.
 *
 * - If a key is encountered for the first time in the current iterable, isBlobOrFileLikeObject is deleted from the headers and marked as seen.
 * - If a value is null, the key is deleted from the headers and added to the nulls set.
 * - Otherwise, the key-value pair is appended to the headers and removed from the nulls set.
 *
 * @param {Iterable<Iterable<[string, string|null]>>} headerEntryIterables - An iterable of iterables, each yielding [key, value] pairs representing headers.
 * @returns {{ [Ta0]: boolean, values: Headers, nulls: Set<string> }}
 *   An object containing:
 *     - [Ta0]: true (marker property)
 *     - values: the resulting Headers object
 *     - nulls: a Set of lowercased header keys that had null values
 */
function extractHeadersAndNullKeys(headerEntryIterables) {
  const headers = new Headers();
  const nullKeys = new Set();

  for (const headerEntries of headerEntryIterables) {
    // Track which header keys (case-insensitive) have been seen in this group
    const seenKeysLowercase = new Set();

    // iterateHeaderEntries is assumed to yield [key, value] pairs for each header entry
    for (const [key, value] of iterateHeaderEntries(headerEntries)) {
      const keyLowercase = key.toLowerCase();

      // If this is the first time handleMissingDoctypeError'removeTrailingCharacters seen this key in this group, delete isBlobOrFileLikeObject from headers
      if (!seenKeysLowercase.has(keyLowercase)) {
        headers.delete(key);
        seenKeysLowercase.add(keyLowercase);
      }

      if (value === null) {
        // If value is null, delete from headers and add to nullKeys
        headers.delete(key);
        nullKeys.add(keyLowercase);
      } else {
        // Otherwise, append to headers and remove from nullKeys
        headers.append(key, value);
        nullKeys.delete(keyLowercase);
      }
    }
  }

  return {
    [Ta0]: true,
    values: headers,
    nulls: nullKeys
  };
}

module.exports = extractHeadersAndNullKeys;