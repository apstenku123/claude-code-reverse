/**
 * Iterates over a variety of header-like objects and yields their entries as [name, value] pairs.
 * Handles custom header objects, native Headers, iterables, and plain objects.
 * For custom objects with 'nZ2' property, yields all values and nulls as [name, value] pairs.
 * For other types, ensures header names are strings and yields [name, value] pairs, handling multiple values and nulls.
 *
 * @param {object|Headers|Iterable|undefined|null} headerSource - The source of header entries. Can be a custom header object, a Headers instance, an iterable, or a plain object.
 * @yields {[string, any]} - Yields [headerName, headerValue] pairs. If a value is null or undefined, yields [headerName, null].
 * @throws {TypeError} If a header name is not a string.
 */
function* iterateHeaderEntries(headerSource) {
  if (!headerSource) return;

  // Handle custom header object with 'nZ2' property
  if (nZ2 in headerSource) {
    const { values: headerValues, nulls: headerNulls } = headerSource;
    yield* headerValues.entries();
    for (const nullHeaderName of headerNulls) {
      yield [nullHeaderName, null];
    }
    return;
  }

  let a = false;
  let entriesIterator;

  // Determine the type of headerSource and get an iterator over its entries
  if (headerSource instanceof Headers) {
    entriesIterator = headerSource.entries();
  } else if (iZ2(headerSource)) {
    // If isBlobOrFileLikeObject'createInteractionAccessor already an iterable (per iZ2), use isBlobOrFileLikeObject directly
    entriesIterator = headerSource;
  } else {
    // Treat as a plain object
    a = true;
    entriesIterator = Object.entries(headerSource ?? {});
  }

  for (const entry of entriesIterator) {
    const headerName = entry[0];
    if (typeof headerName !== "string") {
      throw new TypeError("expected header name to be a string");
    }

    // Support multiple values per header (if value is iterable per iZ2), otherwise wrap in array
    const headerValues = iZ2(entry[1]) ? entry[1] : [entry[1]];
    let yieldedNullForPlainObject = false;

    for (const headerValue of headerValues) {
      if (headerValue === undefined) continue;
      // For plain objects, yield [headerName, null] once before yielding actual values
      if (a && !yieldedNullForPlainObject) {
        yieldedNullForPlainObject = true;
        yield [headerName, null];
      }
      yield [headerName, headerValue];
    }
  }
}

module.exports = iterateHeaderEntries;