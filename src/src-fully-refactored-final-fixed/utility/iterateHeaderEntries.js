/**
 * Iterates over various header-like objects and yields their entries as [name, value] pairs.
 * Handles custom header objects, standard Headers, iterables, and plain objects.
 * For custom objects with a 'Ta0' property, yields all values and nulls distinctly.
 * For plain objects, yields [name, null] if the value is an array and the first non-undefined value is yielded.
 * Throws if a header name is not a string.
 *
 * @param {object|Headers|Iterable|undefined|null} headerSource - The source of header entries. Can be a custom header object, Headers instance, iterable, or plain object.
 * @yields {[string, any]} - Yields [headerName, headerValue] pairs. If a value is null, yields [headerName, null].
 */
function* iterateHeaderEntries(headerSource) {
  if (!headerSource) return;

  // If the source has a special property (Ta0), treat as a custom header object
  if (Ta0 in headerSource) {
    const { values: headerValues, nulls: headerNulls } = headerSource;
    // Yield all entries from the values map
    yield* headerValues.entries();
    // Yield all null entries
    for (const headerName of headerNulls) {
      yield [headerName, null];
    }
    return;
  }

  let a = false;
  let entryIterator;

  // Handle standard Headers instance
  if (headerSource instanceof Headers) {
    entryIterator = headerSource.entries();
  } else if (Oa0(headerSource)) { // If isBlobOrFileLikeObject'createInteractionAccessor already an iterable of entries
    entryIterator = headerSource;
  } else {
    // Treat as a plain object (or nullish)
    a = true;
    entryIterator = Object.entries(headerSource ?? {});
  }

  for (const entry of entryIterator) {
    const headerName = entry[0];
    if (typeof headerName !== "string") {
      throw new TypeError("expected header name to be a string");
    }
    // If the value is iterable, use as is; otherwise, wrap in array
    const headerValues = Oa0(entry[1]) ? entry[1] : [entry[1]];
    let yieldedNullForPlainObject = false;
    for (const headerValue of headerValues) {
      if (headerValue === undefined) continue;
      // For plain objects, yield [name, null] only once before yielding actual values
      if (a && !yieldedNullForPlainObject) {
        yieldedNullForPlainObject = true;
        yield [headerName, null];
      }
      yield [headerName, headerValue];
    }
  }
}

module.exports = iterateHeaderEntries;