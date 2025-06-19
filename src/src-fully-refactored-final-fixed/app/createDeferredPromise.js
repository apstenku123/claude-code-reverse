/**
 * Creates a deferred Promise object, exposing its resolve and reject methods externally.
 *
 * @returns {{ promise: Promise<any>, resolve: Function, reject: Function }}
 *   An object containing the promise, and its resolve and reject functions.
 *
 * @example
 * const deferred = createDeferredPromise();
 * deferred.promise.then(result => console.log(result));
 * deferred.resolve('Success!');
 */
function createDeferredPromise() {
  let resolvePromise;
  let rejectPromise;

  // Create a new Promise and capture its resolve and reject functions
  const promise = new Promise((resolve, reject) => {
    resolvePromise = resolve;
    rejectPromise = reject;
  });

  return {
    promise,
    resolve: resolvePromise,
    reject: rejectPromise
  };
}

module.exports = createDeferredPromise;