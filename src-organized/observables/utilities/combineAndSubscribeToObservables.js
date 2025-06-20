/**
 * Combines the provided observables with a source observable using zip, and subscribes to the result.
 *
 * @param {...any} observables - One or more observables to combine with the source observable.
 * @returns {Function} An operator function that takes a source observable and a subscriber, combines them with the provided observables using zip, and subscribes the subscriber to the result.
 */
function combineAndSubscribeToObservables(...observables) {
  return fx9.operate((sourceObservable, subscriber) => {
    // Combine the source observable with the provided observables using zip
    // kx9 processes the observables array as required by the implementation
    // yx9 wraps the source observable and the processed observables into a single array
    // xx9.zip applies zip to all observables, then subscribes the subscriber
    xx9.zip.apply(
      undefined,
      yx9([sourceObservable], kx9(observables))
    ).subscribe(subscriber);
  });
}

module.exports = combineAndSubscribeToObservables;