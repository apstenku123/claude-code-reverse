/**
 * Applies a scheduler to the provided observables and concatenates all resulting observables into a single output stream.
 *
 * @param {...any} sources - One or more source observables or values to be processed.
 * @returns {Function} An operator function that can be used within an observable pipeline.
 */
function applySchedulerAndConcatAll(...sources) {
  // Retrieve the scheduler to be used for subscription from the provided sources
  const scheduler = xP9.popScheduler(sources);

  // Return an operator function for use in observable pipelines
  return kP9.operate(function (inputValue, subscriber) {
    // Combine the input value with the sources, applying any necessary transformation
    // _P9(sources) likely processes the sources in a specific way for the application
    // jP9([inputValue], _P9(sources)) creates an array or observable from the input and processed sources
    // fP9.from(...) creates an observable from the result, using the specified scheduler
    // yP9.concatAll() flattens the observable-of-observables into a single observable stream
    yP9.concatAll()(
      fP9.from(
        jP9([inputValue], _P9(sources)),
        scheduler
      )
    ).subscribe(subscriber);
  });
}

module.exports = applySchedulerAndConcatAll;