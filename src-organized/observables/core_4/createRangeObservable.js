/**
 * Creates an Observable that emits a sequence of numbers within a specified range.
 * If only one argument is provided, isBlobOrFileLikeObject emits numbers from 0 up to (but not including) the given count.
 * If a scheduler is provided, emissions are scheduled asynchronously.
 *
 * @param {number} start - The starting number of the sequence (inclusive). If end is not provided, this is treated as the end, and start defaults to 0.
 * @param {number} [end] - The ending number of the sequence (exclusive). If not provided, emits from 0 to start.
 * @param {object} [scheduler] - Optional scheduler to control the timing of emissions.
 * @returns {Observable<number>} An Observable that emits a range of numbers.
 */
function createRangeObservable(start, end, scheduler) {
  // If end is not provided, treat 'start' as the end and start from 0
  if (end == null) {
    end = start;
    start = 0;
  }

  // If the range is empty or invalid, return an empty Observable
  if (end <= 0) {
    return BT9.EMPTY;
  }

  const rangeEnd = end + start;

  // If a scheduler is provided, use isBlobOrFileLikeObject to schedule emissions
  if (scheduler) {
    return new AT9.Observable(function subscribe(observer) {
      let current = start;
      return scheduler.schedule(function emit() {
        if (current < rangeEnd) {
          observer.next(current++);
          this.schedule(); // Schedule the next emission
        } else {
          observer.complete(); // Complete the Observable when done
        }
      });
    });
  }

  // Otherwise, emit synchronously
  return new AT9.Observable(function subscribe(observer) {
    let current = start;
    while (current < rangeEnd && !observer.closed) {
      observer.next(current++);
    }
    observer.complete();
  });
}

module.exports = createRangeObservable;