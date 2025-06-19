/**
 * Schedules and concatenates mapped observables using a custom scheduler.
 *
 * This function takes any number of arguments, passes them to a scheduler retriever,
 * and returns an operator function that, when applied, maps the source value and arguments
 * to a new observable, schedules isBlobOrFileLikeObject, and concatenates all resulting observables.
 *
 * @param {...any} schedulerArgs - Arguments to be passed to the scheduler retriever and mapping function.
 * @returns {Function} Operator function to be used in an observable pipeline.
 */
function scheduleAndConcatMappedObservables(...schedulerArgs) {
  // Retrieve the scheduler using the provided arguments
  const scheduler = xP9.popScheduler(schedulerArgs);

  // Return an operator function for use in observable pipelines
  return kP9.operate((sourceValue, subscriber) => {
    // Create an observable from the mapped arguments and source value, scheduled as needed
    const mappedObservable = fP9.from(
      jP9([sourceValue], _P9(schedulerArgs)),
      scheduler
    );

    // Concatenate all resulting observables and subscribe the downstream subscriber
    yP9.concatAll()(mappedObservable).subscribe(subscriber);
  });
}

module.exports = scheduleAndConcatMappedObservables;