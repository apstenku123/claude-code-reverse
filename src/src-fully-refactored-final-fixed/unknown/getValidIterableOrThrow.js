/**
 * Attempts to retrieve a valid iterable from the provided source or configuration.
 * If none of the checks succeed, throws a TypeError to enforce that only iterable objects can be destructured.
 *
 * @param {any} source - The primary object to check for iterability.
 * @param {any} config - An optional configuration or fallback object to check for iterability.
 * @returns {any} - The first valid iterable found, or throws if none are valid.
 */
function getValidIterableOrThrow(source, config) {
  // Check if the source is a valid iterable
  const iterableFromSource = vA(source);
  if (iterableFromSource) {
    return iterableFromSource;
  }

  // Check if the source and config together yield a valid iterable
  const iterableFromConfig = collectIterableItems(source, config);
  if (iterableFromConfig) {
    return iterableFromConfig;
  }

  // Check for another possible valid iterable using a different method
  const alternativeIterable = normalizeIterableOrArrayLike(source, config);
  if (alternativeIterable) {
    return alternativeIterable;
  }

  // If none of the above checks succeed, throw a TypeError
  return t1(); // throwIfNotIterable
}

module.exports = getValidIterableOrThrow;