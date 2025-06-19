/**
 * Emits each item from the provided array to an Observable subscriber, using the given scheduler.
 *
 * @param {Array<any>} itemsArray - The array of items to emit to the subscriber.
 * @param {Object} scheduler - The scheduler object used to schedule emissions (must have a schedule method).
 * @returns {Observable} An Observable that emits each item in the array using the scheduler.
 */
function emitArrayItemsWithScheduler(itemsArray, scheduler) {
  return new PM9.Observable(function (subscriber) {
    let currentIndex = 0;
    // Schedule the emission of array items using the provided scheduler
    return scheduler.schedule(function emitNext() {
      if (currentIndex === itemsArray.length) {
        // All items have been emitted; complete the Observable
        subscriber.complete();
      } else {
        // Emit the next item
        subscriber.next(itemsArray[currentIndex++]);
        // If the subscriber is still open, schedule the next emission
        if (!subscriber.closed) {
          this.schedule();
        }
      }
    });
  });
}

module.exports = emitArrayItemsWithScheduler;