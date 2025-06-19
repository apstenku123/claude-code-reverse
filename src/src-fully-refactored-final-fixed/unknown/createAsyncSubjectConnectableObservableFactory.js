/**
 * Creates a factory function that, given a source Observable, returns a ConnectableObservable
 * which uses an AsyncSubject to multicast values. This allows multiple subscribers to share
 * a single subscription to the source Observable, and only receive the last emitted value
 * when the source completes.
 *
 * @returns {function} a function that takes a source Observable and returns a ConnectableObservable
 *                     using an AsyncSubject for multicasting.
 */
function createAsyncSubjectConnectableObservableFactory() {
  return function createConnectableObservableWithAsyncSubject(sourceObservable) {
    // Create a new AsyncSubject instance to multicast the source'createInteractionAccessor last value
    const asyncSubject = new dj9.AsyncSubject();
    // Return a ConnectableObservable that uses the AsyncSubject for multicasting
    return new uj9.ConnectableObservable(
      sourceObservable,
      function getSubject() {
        return asyncSubject;
      }
    );
  };
}

module.exports = createAsyncSubjectConnectableObservableFactory;