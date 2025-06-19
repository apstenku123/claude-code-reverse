/**
 * Applies an operation using fx9.operate, subscribing to a zipped combination of the given observables.
 *
 * @param {...any} observables - The observables to zip together and operate on.
 * @returns {any} The result of fx9.operate with the zipped observables.
 */
function operateWithZippedObservables(...observables) {
  // Wrap the operation in fx9.operate
  return fx9.operate(function (sourceObservable, observer) {
    // Prepare the array of observables to zip: the source plus the provided ones
    // kx9 processes the additional observables, yx9 combines them with the source
    const zippedObservables = yx9([sourceObservable], kx9(observables));
    // Use xx9.zip to zip all observables and subscribe the observer
    xx9.zip.apply(undefined, zippedObservables).subscribe(observer);
  });
}

module.exports = operateWithZippedObservables;