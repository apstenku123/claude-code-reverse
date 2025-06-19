/**
 * Creates a function that, given a source Observable, returns a ConnectableObservable
 * using an AsyncSubject as its subject factory. This allows multicasting the source
 * Observable so that all subscribers receive the same last emitted value upon completion.
 *
 * @returns {function(sourceObservable: Observable): ConnectableObservable}
 *   a function that takes a source Observable and returns a ConnectableObservable
 *   using an AsyncSubject for multicasting.
 */
function createConnectableAsyncSubjectObservable() {
  return function (sourceObservable) {
    // Create a new AsyncSubject instance to multicast the source
    const asyncSubject = new dj9.AsyncSubject();
    // Return a ConnectableObservable that uses the AsyncSubject as its subject
    return new uj9.ConnectableObservable(sourceObservable, function () {
      return asyncSubject;
    });
  };
}

module.exports = createConnectableAsyncSubjectObservable;