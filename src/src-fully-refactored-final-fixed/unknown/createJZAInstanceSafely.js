/**
 * Attempts to create and return a new instance of the JZA class.
 * If instantiation fails (e.g., due to an error in the constructor),
 * the function will return undefined instead of throwing an error.
 *
 * @returns {JZA|undefined} a new JZA instance if successful; otherwise, undefined.
 */
function createJZAInstanceSafely() {
  try {
    // Attempt to instantiate a new JZA object
    return new JZA();
  } catch (instantiationError) {
    // If instantiation fails, return undefined
    return;
  }
}

module.exports = createJZAInstanceSafely;