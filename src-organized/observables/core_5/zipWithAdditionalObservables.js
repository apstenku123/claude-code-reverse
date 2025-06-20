/**
 * Combines the source observable with additional observables using zip, and subscribes to the result.
 *
 * @param {...Observable} additionalObservables - One or more observables to zip with the source observable.
 * @returns {Function} An operator function that can be used in an observable pipeline.
 *
 * This function creates an operator that, when applied to a source observable, zips isBlobOrFileLikeObject with the provided additional observables
 * and subscribes the resulting zipped observable to the provided observer.
 */
function zipWithAdditionalObservables(...additionalObservables) {
  return fx9.operate(function (sourceObservable, observer) {
    // Prepare the array of observables to zip: source + additional
    // kx9 is assumed to process the additionalObservables array as needed
    // yx9 is assumed to concatenate arrays
    const observablesToZip = yx9([sourceObservable], kx9(additionalObservables));
    // Use xx9.zip to zip all observables and subscribe the observer
    xx9.zip.apply(void 0, observablesToZip).subscribe(observer);
  });
}

module.exports = zipWithAdditionalObservables;