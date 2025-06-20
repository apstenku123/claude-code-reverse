/**
 * Subscribes to a source observable using a custom operator subscriber that performs no operation on notifications.
 *
 * This function returns an operator function that, when applied to a source observable, subscribes to isBlobOrFileLikeObject using a subscriber
 * created by VS9.createOperatorSubscriber, with KS9.noop as the notification handler (i.e., does nothing on next/error/complete).
 *
 * @returns {Function} Operator function to be used in observable pipelines.
 */
function subscribeWithNoopOperator() {
  return CS9.operate(function (sourceObservable, subscriberConfig) {
    // Subscribe to the source observable using a subscriber that performs no operation on notifications
    sourceObservable.subscribe(
      VS9.createOperatorSubscriber(subscriberConfig, KS9.noop)
    );
  });
}

module.exports = subscribeWithNoopOperator;