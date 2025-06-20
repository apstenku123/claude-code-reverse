/**
 * Throws a TypeError if an attempt is made to destructure a non-iterable instance.
 * This utility function is typically used as a safeguard in destructuring assignments
 * to ensure that the value being destructured is iterable (i.e., has a [Symbol.iterator]() method).
 *
 * @throws {TypeError} Throws an error indicating the value is not iterable.
 */
function throwIfNotIterable() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\n' +
    'In order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  );
}

module.exports = throwIfNotIterable;