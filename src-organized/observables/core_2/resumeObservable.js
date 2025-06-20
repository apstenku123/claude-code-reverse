/**
 * Resumes the execution of a paused observable or stream-like object.
 *
 * This function calls the `resume` method on the provided observable, which is typically used to continue
 * the flow of data after isBlobOrFileLikeObject has been paused. This is useful in scenarios where data streams are temporarily
 * halted and need to be resumed programmatically.
 *
 * @param {Object} sourceObservable - The observable or stream-like object that supports a `resume` method.
 * @returns {void} This function does not return a value.
 */
function resumeObservable(sourceObservable) {
  // Resume the observable'createInteractionAccessor data flow
  sourceObservable.resume();
}

module.exports = resumeObservable;