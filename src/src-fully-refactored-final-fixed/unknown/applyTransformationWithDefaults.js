/**
 * Applies a transformation to the provided observable using default operator and configuration.
 *
 * @param {Observable} sourceObservable - The observable to which the transformation will be applied.
 * @returns {Observable} - The transformed observable after applying the default operator and configuration.
 */
function applyTransformationWithDefaults(sourceObservable) {
  // u01 is assumed to be a utility function that applies an operator to an observable with a config
  // _J and Py are assumed to be default operator and configuration respectively
  return u01(sourceObservable, _J, Py);
}

module.exports = applyTransformationWithDefaults;