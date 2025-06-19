/**
 * Combines the source observable with additional observables using zip, and subscribes to the result.
 *
 * @param {...Observable} additionalObservables - Additional observables to combine with the source observable.
 * @returns {Function} An operator function that can be used in an observable pipeline.
 */
function combineWithAdditionalObservables(...additionalObservables) {
  // The operator function to be used in an observable pipeline
  return fx9.operate(function (sourceObservable, subscriber) {
    // Combine the source observable with the additional observables using zip
    // kx9 processes the additionalObservables array as required by the implementation
    // yx9 wraps the sourceObservable in an array and prepares the arguments for zip
    xx9.zip.apply(
      void 0,
      yx9([sourceObservable], kx9(additionalObservables))
    ).subscribe(subscriber);
  });
}

module.exports = combineWithAdditionalObservables;