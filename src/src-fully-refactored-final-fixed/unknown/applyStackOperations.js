/**
 * Applies two stack operations to the provided stack interface using the given source, configuration, and subscription.
 *
 * @param {Object} sourceObservable - The source observable or data source to operate on.
 * @param {Object} config - Configuration object used for the second stack operation.
 * @param {Object} subscription - Subscription or context object used for the first stack operation.
 * @returns {Object} An object with an applyToStack method that applies two operations to the stack interface.
 */
function applyStackOperations(sourceObservable, config, subscription) {
  return {
    /**
     * Applies two stack operations to the given stack interface.
     *
     * @param {Object} stackInterface - The stack interface providing the add method.
     */
    applyToStack: (stackInterface) => {
      // Add the result of BbA with sourceObservable and subscription, using IbA as the operation type
      stackInterface.add(BbA(sourceObservable, subscription), IbA);
      // Add the result of QbA with sourceObservable and config, using GbA as the operation type
      stackInterface.add(QbA(sourceObservable, config), GbA);
    }
  };
}

module.exports = applyStackOperations;