/**
 * Checks if the provided config object is not null and its type does not match the source observable.
 *
 * @param {any} sourceObservable - The observable or value to compare the type against.
 * @param {any} config - The configuration object to check for type compatibility.
 * @returns {boolean} Returns true if config is not null and its type does not match sourceObservable; otherwise, false.
 */
function isConfigTypeMismatch(sourceObservable, config) {
  // Ensure config is not null or undefined, and check if its type does not match sourceObservable
  return config != null && !EKA._isTypeMatch(sourceObservable, config);
}

module.exports = isConfigTypeMismatch;