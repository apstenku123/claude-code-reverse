/**
 * Applies scheduling to the emissions, completion, and errors of an Observable using a specified scheduler and delay.
 *
 * @param {SchedulerLike} scheduler - The scheduler to use for scheduling emissions.
 * @param {number} [delay=0] - Optional delay (in milliseconds) to apply to each scheduled action.
 * @returns {function} Operator function to be used with Observable'createInteractionAccessor pipe method.
 */
function scheduleOperatorOnObservable(scheduler, delay = 0) {
  return HM9.operate((sourceObservable, subscriber) => {
    // Subscribe to the source observable with a custom operator subscriber
    sourceObservable.subscribe(
      zM9.createOperatorSubscriber(
        subscriber,
        // Next handler: schedule the next value emission
        (value) => {
          return ZL1.executeSchedule(
            subscriber,
            scheduler,
            () => subscriber.next(value),
            delay
          );
        },
        // Complete handler: schedule the completion notification
        () => {
          return ZL1.executeSchedule(
            subscriber,
            scheduler,
            () => subscriber.complete(),
            delay
          );
        },
        // Error handler: schedule the error notification
        (error) => {
          return ZL1.executeSchedule(
            subscriber,
            scheduler,
            () => subscriber.error(error),
            delay
          );
        }
      )
    );
  });
}

module.exports = scheduleOperatorOnObservable;