/**
 * Applies the 'check' operator from the 'qv' module to the provided observable and configuration.
 *
 * @param {Observable} sourceObservable - The observable to which the 'check' operator will be applied.
 * @param {Object} config - Configuration options for the 'check' operator.
 * @returns {any} The result of applying the 'check' operator to the observable with the given configuration.
 */
function applyCheckOperator(sourceObservable, config) {
  // U81 is assumed to be a higher-order function that applies an operator to an observable
  // qv.check is the operator being applied
  return U81(qv.check)(sourceObservable, config);
}

module.exports = applyCheckOperator;