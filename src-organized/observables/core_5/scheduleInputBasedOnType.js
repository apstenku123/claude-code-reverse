/**
 * Schedules the provided input based on its type using the appropriate scheduler function.
 * Supports Observables, Arrays, Promises, AsyncIterables, Iterables, and ReadableStreams.
 * Throws an error if the input type is not supported.
 *
 * @param {any} sourceInput - The input to be scheduled. Can be an Observable, Array-like, Promise, AsyncIterable, Iterable, or ReadableStream-like object.
 * @param {any} schedulerConfig - The configuration or scheduler to use for scheduling the input.
 * @returns {any} The scheduled observable or result, depending on the input type and scheduler.
 * @throws {Error} If the input type is not supported for scheduling.
 */
function scheduleInputBasedOnType(sourceInput, schedulerConfig) {
  // Only proceed if the input is not null or undefined
  if (sourceInput != null) {
    // Check if the input is an InteropObservable
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
    // Check if the input is an AsyncIterable
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
  // If none of the supported types matched, throw an error
  throw sM9.createInvalidObservableTypeError(sourceInput);
}

module.exports = scheduleInputBasedOnType;