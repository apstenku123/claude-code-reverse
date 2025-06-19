/**
 * Schedules the provided input (observable-like, array-like, promise, iterable, async iterable, or readable stream-like)
 * using the appropriate scheduler function based on its type. Throws an error if the input is not a recognized observable type.
 *
 * @param {any} sourceInput - The input to be scheduled. Can be an Observable, Array-like, Promise, AsyncIterable, Iterable, or ReadableStream-like object.
 * @param {any} schedulerConfig - The scheduler or configuration to use for scheduling the input.
 * @returns {any} The scheduled observable or result, depending on the input type and scheduler.
 * @throws {Error} Throws if the input is not a recognized observable type.
 */
function scheduleInputObservable(sourceInput, schedulerConfig) {
  if (sourceInput != null) {
    // Check if input is an InteropObservable
    if (cM9.isInteropObservable(sourceInput)) {
      return hM9.scheduleObservable(sourceInput, schedulerConfig);
    }
    // Check if input is Array-like
    if (iM9.isArrayLike(sourceInput)) {
      return dM9.scheduleArray(sourceInput, schedulerConfig);
    }
    // Check if input is a Promise
    if (lM9.isPromise(sourceInput)) {
      return mM9.schedulePromise(sourceInput, schedulerConfig);
    }
    // Check if input is an AsyncIterable
    if (aM9.isAsyncIterable(sourceInput)) {
      return pM9.scheduleAsyncIterable(sourceInput, schedulerConfig);
    }
    // Check if input is an Iterable
    if (nM9.isIterable(sourceInput)) {
      return uM9.scheduleIterable(sourceInput, schedulerConfig);
    }
    // Check if input is a ReadableStream-like object
    if (rM9.isReadableStreamLike(sourceInput)) {
      return oM9.scheduleReadableStreamLike(sourceInput, schedulerConfig);
    }
  }
  // If input type is not recognized, throw an error
  throw sM9.createInvalidObservableTypeError(sourceInput);
}

module.exports = scheduleInputObservable;