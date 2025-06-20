/**
 * Creates an Observable that emits each item from the provided array sequentially.
 *
 * @param {Array<any>} sourceArray - The array of items to emit through the Observable.
 * @returns {Observable<any>} An Observable that emits each item from the array and then completes.
 */
function createObservableFromArray(sourceArray) {
  return new zf.Observable(function (observer) {
    // Iterate over the array and emit each item to the observer
    for (let index = 0; index < sourceArray.length && !observer.closed; index++) {
      observer.next(sourceArray[index]);
    }
    // Signal completion to the observer after all items are emitted
    observer.complete();
  });
}

module.exports = createObservableFromArray;