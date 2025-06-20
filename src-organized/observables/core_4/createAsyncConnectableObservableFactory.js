/**
 * Creates a factory function that, given a source Observable, returns a ConnectableObservable
 * using an AsyncSubject as its underlying subject. This allows multicasting the source Observable
 * to multiple subscribers, emitting only the last value upon completion.
 *
 * @returns {function(import('rxjs').Observable): import('rxjs').ConnectableObservable}
 *   a function that takes a source Observable and returns a ConnectableObservable using AsyncSubject.
 */
function createAsyncConnectableObservableFactory() {
  return function createConnectableObservableWithAsyncSubject(sourceObservable) {
    // Create a single AsyncSubject instance to multicast the source Observable
    const asyncSubject = new dj9.AsyncSubject();
    // Return a ConnectableObservable that uses the AsyncSubject for multicasting
    return new uj9.ConnectableObservable(
      sourceObservable,
      () => asyncSubject
    );
  };
}

module.exports = createAsyncConnectableObservableFactory;