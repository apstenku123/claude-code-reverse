/**
 * Creates an RxJS operator that transforms source emissions into Notification objects
 * and forwards them to the downstream observer, handling next, complete, and error events.
 *
 * @returns {function} An RxJS operator function that wraps source emissions in Notification objects.
 */
function createNotificationOperator() {
  return o_9.operate(function (sourceObservable, destinationObserver) {
    // Subscribe to the source observable using a custom operator subscriber
    sourceObservable.subscribe(
      t_9.createOperatorSubscriber(
        destinationObserver,
        // Handle 'next' emissions: wrap value in a Notification and forward
        function (value) {
          destinationObserver.next(GR1.Notification.createNext(value));
        },
        // Handle 'complete': send a complete Notification and complete the observer
        function () {
          destinationObserver.next(GR1.Notification.createComplete());
          destinationObserver.complete();
        },
        // Handle 'error': send an error Notification and complete the observer
        function (error) {
          destinationObserver.next(GR1.Notification.createErrorResolver(error));
          destinationObserver.complete();
        }
      )
    );
  });
}

module.exports = createNotificationOperator;