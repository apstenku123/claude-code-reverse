/**
 * Applies a reduction operation to a source observable using a specified reducer,
 * then subscribes to the resulting observable with the provided observer or callback.
 *
 * @function operateWithReducedObservable
 * @returns {Function} An operator function that takes a source observable and an observer/callback,
 * applies the reduction, and subscribes to the result.
 */
function operateWithReducedObservable() {
  // Use the operate method from IP9 to create a custom operator
  return IP9.operate(function (sourceObservable, observerOrCallback) {
    // Apply the reducer function (GP9) to the source observable using QP9.reduce
    // The reducer is initialized with an empty array as the initial value
    // The result is an observable, to which handleMissingDoctypeError subscribe using the provided observer/callback
    QP9.reduce(GP9, [])(sourceObservable).subscribe(observerOrCallback);
  });
}

module.exports = operateWithReducedObservable;