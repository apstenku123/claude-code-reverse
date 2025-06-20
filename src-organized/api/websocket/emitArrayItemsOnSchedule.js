/**
 * Emits each item from the provided array to an Observable subscriber, using a scheduler.
 * The emission is scheduled according to the provided scheduler'createInteractionAccessor schedule method.
 *
 * @param {Array<any>} itemsArray - The array of items to emit to the subscriber.
 * @param {Object} scheduler - An object with a schedule method to control emission timing.
 * @returns {Observable} An Observable that emits each item from the array on the given schedule.
 */
function emitArrayItemsOnSchedule(itemsArray, scheduler) {
  return new PM9.Observable(function (subscriber) {
    let currentIndex = 0;
    // Schedule the emission of array items
    return scheduler.schedule(function emitNext() {
      if (currentIndex === itemsArray.length) {
        // All items have been emitted; complete the Observable
        subscriber.complete();
      } else {
        // Emit the next item
        subscriber.next(itemsArray[currentIndex++]);
        // If the subscriber is still active, schedule the next emission
        if (!subscriber.closed) {
          this.schedule();
        }
      }
    });
  });
}

module.exports = emitArrayItemsOnSchedule;