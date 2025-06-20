/**
 * Checks if the provided object implements the iterable protocol by verifying
 * the presence of a function at the Symbol.iterator property.
 *
 * @param {object} possibleIterable - The object to check for iterability.
 * @returns {boolean} True if the object has a function at Symbol.iterator, otherwise false.
 */
function hasIterableFunction(possibleIterable) {
  // Check if possibleIterable is not null/undefined and has a function at Symbol.iterator
  return nq9.isFunction(
    possibleIterable?.[iq9.iterator]
  );
}

module.exports = hasIterableFunction;