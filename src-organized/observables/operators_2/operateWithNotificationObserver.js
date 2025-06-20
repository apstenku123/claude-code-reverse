/**
 * Applies a custom operator to an observable, subscribing with a notification observer.
 *
 * This function uses PS9.operate to apply an operator that subscribes to the source observable
 * using a subscriber created by SS9.createOperatorSubscriber. Each notification is observed
 * using TS9.observeNotification.
 *
 * @returns {Function} An operator function to be used with observables.
 */
function operateWithNotificationObserver() {
  return PS9.operate(
    /**
     * Operator function applied to the source observable and configuration.
     * @param {Observable} sourceObservable - The source observable to subscribe to.
     * @param {Object} operatorConfig - The configuration or destination subscriber.
     */
    function (sourceObservable, operatorConfig) {
      // Create a subscriber that observes notifications and subscribe to the source observable
      sourceObservable.subscribe(
        SS9.createOperatorSubscriber(
          operatorConfig,
          /**
           * Handles each notification emitted by the source observable.
           * @param {any} notification - The notification emitted by the observable.
           */
          function (notification) {
            // Observe the notification using the provided observer
            return TS9.observeNotification(notification, operatorConfig);
          }
        )
      );
    }
  );
}

module.exports = operateWithNotificationObserver;