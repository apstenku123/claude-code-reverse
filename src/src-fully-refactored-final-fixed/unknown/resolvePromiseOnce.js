/**
 * Resolves a promise only once with the provided value.
 * Prevents multiple resolutions by checking and setting a flag.
 *
 * @param {any} resolutionValue - The value to resolve the promise with.
 * @returns {void}
 */
function resolvePromiseOnce(resolutionValue) {
  // If the promise has already been resolved, exit early
  if (isPromiseResolved) return;
  // Mark the promise as resolved
  isPromiseResolved = true;
  // Resolve the promise with the provided value
  promiseHandler.resolve(pendingPromise, resolutionValue);
}

module.exports = resolvePromiseOnce;