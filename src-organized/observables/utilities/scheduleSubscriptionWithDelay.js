/**
 * Schedules the subscription to a source observable with an optional delay.
 *
 * @param {Object} sourceObservable - The observable to subscribe to.
 * @param {number} [delay=0] - Optional delay (in ms) before subscribing.
 * @returns {Object} An observable that, when subscribed to, schedules the subscription to the source observable after the specified delay.
 */
function scheduleSubscriptionWithDelay(sourceObservable, delay = 0) {
  return EM9.operate(function (outerObservable, subscriber) {
    // Schedule the subscription to the source observable after the specified delay
    const scheduledSubscription = sourceObservable.schedule(function () {
      // Subscribe to the outer observable and add the resulting subscription to the subscriber
      return outerObservable.subscribe(subscriber);
    }, delay);
    // Add the scheduled subscription to the subscriber for proper teardown
    subscriber.add(scheduledSubscription);
  });
}

module.exports = scheduleSubscriptionWithDelay;