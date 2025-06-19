/**
 * Rejects a pending promise only once with the provided error reason.
 * Ensures that the rejection logic is executed a single time by tracking state.
 *
 * @param {any} rejectionReason - The reason or error to reject the promise with.
 * @returns {void}
 */
function rejectPromiseOnce(rejectionReason) {
  // If the promise has already been rejected, do nothing
  if (isPromiseRejected) return;

  // Mark the promise as rejected
  isPromiseRejected = true;

  // Reject the promise with the provided reason
  promiseHandler.reject(pendingPromise, rejectionReason);
}

module.exports = rejectPromiseOnce;