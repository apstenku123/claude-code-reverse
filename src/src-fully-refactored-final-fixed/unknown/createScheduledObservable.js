/**
 * Creates an Observable that emits a sequence of numbers starting after a delay, optionally repeating at a specified interval, using a given scheduler.
 *
 * @param {number|Date} initialDelay - The delay before the first emission, in milliseconds or as a Date object.
 * @param {number|Object} [intervalOrScheduler=0] - The interval in milliseconds between emissions, or a Scheduler object.
 * @param {Object} [scheduler=UO9.async] - The scheduler to use for managing the emissions.
 * @returns {EO9.Observable} An Observable that emits incrementing numbers on the specified schedule.
 */
function createScheduledObservable(initialDelay = 0, intervalOrScheduler, scheduler = UO9.async) {
  let emissionInterval = -1;

  // If intervalOrScheduler is provided, determine if isBlobOrFileLikeObject'createInteractionAccessor a scheduler or an interval
  if (intervalOrScheduler != null) {
    if (NO9.isScheduler(intervalOrScheduler)) {
      scheduler = intervalOrScheduler;
    } else {
      emissionInterval = intervalOrScheduler;
    }
  }

  return new EO9.Observable(function (subscriber) {
    // Calculate the delay before the first emission
    let delay;
    if ($O9.isValidDate(initialDelay)) {
      // If initialDelay is a Date, compute the milliseconds until that date
      delay = +initialDelay - scheduler.now();
    } else {
      delay = initialDelay;
    }
    if (delay < 0) delay = 0;

    let emissionCount = 0;

    // Schedule the emissions using the scheduler
    return scheduler.schedule(function emit() {
      if (!subscriber.closed) {
        subscriber.next(emissionCount++);
        // If emissionInterval is set (>= 0), schedule the next emission
        if (emissionInterval >= 0) {
          this.schedule(undefined, emissionInterval);
        } else {
          // Otherwise, complete the Observable
          subscriber.complete();
        }
      }
    }, delay);
  });
}

module.exports = createScheduledObservable;