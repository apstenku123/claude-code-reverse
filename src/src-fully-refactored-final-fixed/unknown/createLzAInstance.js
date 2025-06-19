/**
 * Creates and returns a new instance of the LzA class using the provided parameters.
 *
 * @param {Observable} sourceObservable - The source observable containing interaction entries to process.
 * @param {Object} config - Configuration object for the LzA instance.
 * @param {Object} subscription - Subscription or context object related to the observable.
 * @param {Function} startUiActionClickTransaction - Function to start a UI action click transaction (dependency).
 * @param {any} externalDependency - Additional external dependency required by LzA.
 * @returns {LzA} a new instance of the LzA class initialized with the provided parameters.
 */
function createLzAInstance(
  sourceObservable,
  config,
  subscription,
  startUiActionClickTransaction,
  externalDependency
) {
  // Instantiate and return a new LzA object with all required dependencies
  return new LzA(
    sourceObservable,
    config,
    subscription,
    startUiActionClickTransaction,
    externalDependency
  );
}

module.exports = createLzAInstance;