/**
 * Creates and returns a new instance of the EmptyError class from the uS9 module.
 * This is typically used to signal that an observable sequence is empty.
 *
 * @returns {EmptyError} An instance of the EmptyError class.
 */
function createEmptyErrorInstance() {
  // Instantiate and return a new EmptyError from the uS9 module
  return new uS9.EmptyError();
}

module.exports = createEmptyErrorInstance;