/**
 * Throws a TypeError if an attempt is made to spread a non-iterable instance.
 * This function is typically used as a safeguard when using the spread operator (...)
 * to ensure that the value being spread is iterable (i.e., has a [Symbol.iterator]() method).
 *
 * @throws {TypeError} Always throws to indicate the value is not iterable.
 */
function throwIfNotIterable() {
  // Throw an error with a clear message about non-iterable values
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\n' +
    'In order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  );
}

module.exports = throwIfNotIterable;