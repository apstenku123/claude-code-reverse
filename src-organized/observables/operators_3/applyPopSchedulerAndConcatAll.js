/**
 * Applies a pop scheduler to the provided observables and concatenates all resulting observables into a single output stream.
 *
 * @param {...any} observables - One or more observables or values to be processed.
 * @returns {Function} An operator function that can be used in an observable pipeline.
 */
function applyPopSchedulerAndConcatAll(...observables) {
  // Get the scheduler to use for subscription from xP9
  const scheduler = xP9.popScheduler(observables);

  // Return an RxJS operator function
  return kP9.operate(function (sourceValue, subscriber) {
    // Wrap the source value and the provided observables using jP9 and _P9
    // fP9.from creates an observable from the array
    // yP9.concatAll flattens the higher-order observable
    yP9.concatAll()(
      fP9.from(
        jP9([sourceValue], _P9(observables)),
        scheduler
      )
    ).subscribe(subscriber);
  });
}

module.exports = applyPopSchedulerAndConcatAll;