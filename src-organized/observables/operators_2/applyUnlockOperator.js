/**
 * Applies the 'unlock' operator from the qv module to the provided observable and configuration.
 *
 * @param {Observable} sourceObservable - The observable to which the unlock operator will be applied.
 * @param {Object} config - Configuration options for the unlock operator.
 * @returns {any} The result of applying the unlock operator to the observable with the given configuration.
 */
function applyUnlockOperator(sourceObservable, config) {
  // U81 is a higher-order function that applies an operator to an observable
  // qv.unlock is the operator being applied
  return U81(qv.unlock)(sourceObservable, config);
}

module.exports = applyUnlockOperator;