/**
 * Creates an operator that subscribes to a source observable and observes notifications using a provided configuration.
 *
 * @returns {Function} An operator function to be used with observables.
 */
function createNotificationObserverOperator() {
  return PS9.operate(
    /**
     * Operator function that subscribes to the source observable and observes notifications.
     *
     * @param {Observable} sourceObservable - The source observable to subscribe to.
     * @param {Object} config - The configuration or subscriber context.
     */
    function (sourceObservable, config) {
      // Create an operator subscriber that observes notifications
      const operatorSubscriber = SS9.createOperatorSubscriber(
        config,
        /**
         * Handles each notification emitted by the source observable.
         *
         * @param {any} notification - The notification emitted by the source observable.
         */
        function (notification) {
          // Observe the notification using the provided configuration
          return TS9.observeNotification(notification, config);
        }
      );
      // Subscribe to the source observable with the operator subscriber
      sourceObservable.subscribe(operatorSubscriber);
    }
  );
}

module.exports = createNotificationObserverOperator;