/**
 * Attempts to retrieve an iterable from the provided source or configuration.
 * Tries multiple strategies in order: getArrayLikeIterable, getIterableFromConfig, getIterableFromAlternative.
 * If none succeed, throws a TypeError indicating the object is not iterable.
 *
 * @param {any} source - The primary object to attempt to retrieve an iterable from.
 * @param {any} config - Additional configuration or fallback value used in alternative strategies.
 * @returns {Iterable|any} - The found iterable object, or throws if none found.
 */
function getIterableOrThrow(source, config) {
  // Try to get an array-like iterable from the source
  const arrayLikeIterable = getArrayLikeIterable(source);
  if (arrayLikeIterable) {
    return arrayLikeIterable;
  }

  // Try to get an iterable using the provided configuration
  const iterableFromConfig = getIterableFromConfig(source, config);
  if (iterableFromConfig) {
    return iterableFromConfig;
  }

  // Try an alternative method to get an iterable
  const alternativeIterable = getIterableFromAlternative(source, config);
  if (alternativeIterable) {
    return alternativeIterable;
  }

  // If none of the above worked, throw a TypeError
  throwIfNotIterable();
}

module.exports = getIterableOrThrow;