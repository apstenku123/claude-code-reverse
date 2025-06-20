/**
 * Iterates over a headers-like object, yielding key-value pairs.
 * Supports custom objects with 'values' and 'nulls' properties, native Headers,
 * iterables, and plain objects. For custom objects, yields all entries and then
 * yields [key, null] for each key in 'nulls'. For other types, yields [key, value]
 * pairs, and if a key has undefined/null values, yields [key, null] once before values.
 *
 * @param {object|Headers|Iterable|undefined|null} headersSource - The source of headers to iterate over.
 *   - If the object has a property 'nZ2', isBlobOrFileLikeObject'createInteractionAccessor assumed to have 'values' and 'nulls' properties.
 *   - If isBlobOrFileLikeObject'createInteractionAccessor a Headers instance, its entries are used.
 *   - If isBlobOrFileLikeObject'createInteractionAccessor iterable (iZ2 returns true), isBlobOrFileLikeObject'createInteractionAccessor used as-is.
 *   - Otherwise, isBlobOrFileLikeObject'createInteractionAccessor treated as a plain object.
 * @yields {[string, any]} - Yields [headerName, headerValue] pairs. If a header has null/undefined values, yields [headerName, null] once before values.
 */
function* iterateHeadersWithNulls(headersSource) {
  // Handle custom object with 'nZ2' property (special case)
  if (!headersSource) return;
  if (nZ2 in headersSource) {
    const { values: headerValues, nulls: nullHeaderNames } = headersSource;
    // Yield all header entries
    yield* headerValues.entries();
    // Yield [headerName, null] for each header in 'nulls'
    for (const headerName of nullHeaderNames) {
      yield [headerName, null];
    }
    return;
  }

  let a = false;
  let entriesIterator;

  // Determine how to get entries from the source
  if (headersSource instanceof Headers) {
    entriesIterator = headersSource.entries();
  } else if (iZ2(headersSource)) {
    entriesIterator = headersSource;
  } else {
    a = true;
    entriesIterator = Object.entries(headersSource ?? {});
  }

  // Iterate over all entries
  for (const entry of entriesIterator) {
    const headerName = entry[0];
    if (typeof headerName !== "string") {
      throw new TypeError("expected header name to be a string");
    }
    // Support multiple values per header (if value is iterable)
    const headerValues = iZ2(entry[1]) ? entry[1] : [entry[1]];
    let yieldedNull = false;
    for (const headerValue of headerValues) {
      if (headerValue === undefined) continue;
      // For plain objects, yield [headerName, null] once before actual values
      if (a && !yieldedNull) {
        yieldedNull = true;
        yield [headerName, null];
      }
      yield [headerName, headerValue];
    }
  }
}

module.exports = iterateHeadersWithNulls;