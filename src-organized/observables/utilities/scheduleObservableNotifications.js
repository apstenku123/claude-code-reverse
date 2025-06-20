/**
 * Schedules the notifications (next, error, complete) from the source observable
 * on a given scheduler, optionally with a delay.
 *
 * @param {SchedulerLike} scheduler - The scheduler to use for scheduling notifications.
 * @param {number} [delay=0] - Optional delay (in milliseconds) for scheduling each notification.
 * @returns {function} An operator function to be used with observables.
 */
function scheduleObservableNotifications(scheduler, delay = 0) {
  return HM9.operate(function (sourceObservable, subscriber) {
    // Subscribe to the source observable using a custom operator subscriber
    sourceObservable.subscribe(
      zM9.createOperatorSubscriber(
        subscriber,
        // Handle 'next' notifications
        function handleNextNotification(value) {
          return ZL1.executeSchedule(
            subscriber,
            scheduler,
            function emitNext() {
              return subscriber.next(value);
            },
            delay
          );
        },
        // Handle 'complete' notifications
        function handleCompleteNotification() {
          return ZL1.executeSchedule(
            subscriber,
            scheduler,
            function emitComplete() {
              return subscriber.complete();
            },
            delay
          );
        },
        // Handle 'error' notifications
        function handleErrorNotification(error) {
          return ZL1.executeSchedule(
            subscriber,
            scheduler,
            function emitError() {
              return subscriber.error(error);
            },
            delay
          );
        }
      )
    );
  });
}

module.exports = scheduleObservableNotifications;