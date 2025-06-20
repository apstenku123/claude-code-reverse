/**
 * Emits each element of the provided array to observers using the specified scheduler.
 *
 * @param {Array<any>} elementsArray - The array of elements to emit.
 * @param {Object} scheduler - The scheduler object used to schedule emissions (must have a schedule method).
 * @returns {Observable<any>} An Observable that emits each element of the array using the scheduler.
 */
function emitArrayElementsWithScheduler(elementsArray, scheduler) {
  return new PM9.Observable(function (subscriber) {
    let currentIndex = 0;
    // Schedule the emission of array elements
    return scheduler.schedule(function emitNext() {
      if (currentIndex === elementsArray.length) {
        // All elements have been emitted; complete the observable
        subscriber.complete();
      } else {
        // Emit the next element
        subscriber.next(elementsArray[currentIndex++]);
        // If the subscriber is still open, schedule the next emission
        if (!subscriber.closed) {
          this.schedule();
        }
      }
    });
  });
}

module.exports = emitArrayElementsWithScheduler;