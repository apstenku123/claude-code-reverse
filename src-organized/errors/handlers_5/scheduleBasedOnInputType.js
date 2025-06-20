/**
 * Schedules an input source (observable, array-like, promise, async iterable, iterable, or readable stream) using the appropriate scheduler based on its type.
 * Throws an error if the input type is not supported.
 *
 * @param {any} sourceInput - The input to be scheduled. Can be an observable, array-like, promise, async iterable, iterable, or readable stream-like object.
 * @param {any} schedulerConfig - The scheduler or configuration to use for scheduling the input.
 * @returns {any} The scheduled observable or result, depending on the input type and scheduler.
 * @throws {Error} If the input type is not supported for scheduling.
 */
function scheduleBasedOnInputType(sourceInput, schedulerConfig) {
  if (sourceInput != null) {
    // Check if the input is an Interop Observable
    if (cM9.isInteropObservable(sourceInput)) {
      return hM9.scheduleObservable(sourceInput, schedulerConfig);
    }
    // Check if the input is Array-like
    if (iM9.isArrayLike(sourceInput)) {
      return dM9.scheduleArray(sourceInput, schedulerConfig);
    }
    // Check if the input is a Promise
    if (lM9.isPromise(sourceInput)) {
      return mM9.schedulePromise(sourceInput, schedulerConfig);
    }
    // Check if the input is an Async Iterable
    if (aM9.isAsyncIterable(sourceInput)) {
      return pM9.scheduleAsyncIterable(sourceInput, schedulerConfig);
    }
    // Check if the input is an Iterable
    if (nM9.isIterable(sourceInput)) {
      return uM9.scheduleIterable(sourceInput, schedulerConfig);
    }
    // Check if the input is a ReadableStream-like object
    if (rM9.isReadableStreamLike(sourceInput)) {
      return oM9.scheduleReadableStreamLike(sourceInput, schedulerConfig);
    }
  }
  // If none of the types match, throw an error indicating invalid observable type
  throw sM9.createInvalidObservableTypeError(sourceInput);
}

module.exports = scheduleBasedOnInputType;