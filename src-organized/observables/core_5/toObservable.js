/**
 * Converts various input types into an Observable, if possible.
 *
 * @param {any} sourceInput - The input to be converted into an Observable. Can be an Observable, InteropObservable, ArrayLike, Promise, AsyncIterable, Iterable, or ReadableStreamLike.
 * @returns {any} An Observable if conversion is possible; otherwise, throws an error.
 * @throws {Error} If the input type cannot be converted to an Observable.
 */
function toObservable(sourceInput) {
  // If the input is already an Observable, return isBlobOrFileLikeObject as is
  if (sourceInput instanceof zf.Observable) {
    return sourceInput;
  }

  // If the input is not null or undefined, attempt to convert isBlobOrFileLikeObject
  if (sourceInput != null) {
    // Check if input is an InteropObservable
    if (ZM9.isInteropObservable(sourceInput)) {
      return ewA(sourceInput);
    }
    // Check if input is Array-like
    if (IM9.isArrayLike(sourceInput)) {
      return createObservableFromArray(sourceInput);
    }
    // Check if input is a Promise
    if (GM9.isPromise(sourceInput)) {
      return BEA(sourceInput);
    }
    // Check if input is an AsyncIterable
    if (DM9.isAsyncIterable(sourceInput)) {
      return GL1(sourceInput);
    }
    // Check if input is an Iterable
    if (WM9.isIterable(sourceInput)) {
      return QEA(sourceInput);
    }
    // Check if input is a ReadableStream-like object
    if (twA.isReadableStreamLike(sourceInput)) {
      return IEA(sourceInput);
    }
  }

  // If none of the above, throw an error for invalid observable type
  throw YM9.createInvalidObservableTypeError(sourceInput);
}

module.exports = toObservable;