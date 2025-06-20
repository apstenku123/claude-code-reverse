/**
 * Merges all inner observables from the PR9 source, but only subscribes to one at a time.
 * This is useful for flattening a higher-order observable (an observable of observables)
 * while limiting concurrency to one, ensuring only one inner observable is active at any moment.
 *
 * @returns {Observable} The merged observable stream with concurrency limited to one.
 */
function mergeSingleObservableStream() {
  // Call the mergeAll operator on PR9 with concurrency set to 1
  // This flattens the observable-of-observables into a single observable stream
  return PR9.mergeAll(1);
}

module.exports = mergeSingleObservableStream;
