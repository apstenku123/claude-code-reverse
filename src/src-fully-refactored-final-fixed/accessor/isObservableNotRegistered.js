/**
 * Checks if a given observable is not registered in the GHA registry.
 *
 * @param {any} observable - The observable to check for registration.
 * @returns {boolean} Returns true if the observable is NOT registered in GHA, false otherwise.
 */
const isObservableNotRegistered = (observable) => {
  // Use the 'has' method of GHA to check if the observable is registered
  // Negate the result to return true if NOT registered
  return !GHA.has(observable);
};

module.exports = isObservableNotRegistered;
