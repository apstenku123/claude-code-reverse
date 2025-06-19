/**
 * Checks if a given promise result object has a status of 'rejected'.
 *
 * @param {Object} promiseResult - The result object from a settled promise (e.g., from Promise.allSettled).
 * @returns {boolean} Returns true if the status is 'rejected', otherwise false.
 */
function isPromiseRejected(promiseResult) {
  // The result object from Promise.allSettled has a 'status' property
  return promiseResult.status === "rejected";
}

module.exports = isPromiseRejected;