/**
 * Handles abort or cancel errors for a given observable-like source.
 *
 * This function processes the provided source (such as an Observable or Promise-like object),
 * checks if isBlobOrFileLikeObject has been aborted, and returns a rejected Promise with a DOMException
 * indicating either an abort or cancellation, including an optional cause.
 *
 * @param {any} sourceObservable - The observable or promise-like source to check for abort/cancel.
 * @param {any} [cause=null] - Optional additional information to attach as the cause of the error.
 * @returns {Promise<never>} a rejected Promise with a DOMException describing the abort or cancel.
 */
function handleAbortOrCancelError(sourceObservable, cause = null) {
  // Perform any required side-effects or checks on the source
  hu1(sH6(sourceObservable));

  // If the source was aborted, return a rejected Promise with an AbortError
  if (rH6(sourceObservable)) {
    return yY1(Object.assign(
      new DOMException("The operation was aborted.", "AbortError"),
      { cause }
    ));
  }

  // Otherwise, return a rejected Promise with a generic cancellation error
  return yY1(Object.assign(
    new DOMException("Request was cancelled."),
    { cause }
  ));
}

module.exports = handleAbortOrCancelError;