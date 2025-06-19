/**
 * Schedules and concatenates observables using a specified scheduler.
 *
 * This function takes any number of source observables, determines the appropriate scheduler,
 * and returns an operator function that, when applied to a source observable, will concatenate
 * all provided observables (including the source) in order, using the scheduler.
 *
 * @param {...any} sourceObservables - The observables or values to be scheduled and concatenated.
 * @returns {Function} An RxJS operator function that can be used in a pipe.
 */
function scheduleAndConcatObservables(...sourceObservables) {
  // Determine the scheduler to use based on the provided observables
  const scheduler = xP9.popScheduler(sourceObservables);

  // Return an RxJS operator function
  return kP9.operate(function (sourceValue, subscriber) {
    // Combine the current source value with the provided observables
    // _P9 is assumed to merge/prepare the observables for concatenation
    // jP9 wraps the source value in an array, as required by _P9
    const combinedObservables = jP9([sourceValue], _P9(sourceObservables));

    // Create an observable from the combined observables using the scheduler
    const scheduledObservable = fP9.from(combinedObservables, scheduler);

    // Concatenate all inner observables and subscribe to the result
    yP9.concatAll()(scheduledObservable).subscribe(subscriber);
  });
}

module.exports = scheduleAndConcatObservables;