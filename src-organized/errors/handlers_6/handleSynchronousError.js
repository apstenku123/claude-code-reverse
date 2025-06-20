/**
 * Handles synchronous errors in observables when deprecated synchronous error handling is enabled.
 *
 * If the global configuration flag `useDeprecatedSynchronousErrorHandling` is set to true and a current subscription context exists,
 * this function marks that an error has been thrown and stores the error object on the subscription context.
 *
 * @param {any} error - The error object to be handled and stored.
 * @returns {void}
 */
function handleSynchronousError(error) {
  // Check if deprecated synchronous error handling is enabled and a subscription context exists
  if (IzA.config.useDeprecatedSynchronousErrorHandling && hP) {
    // Mark that an error has been thrown and store the error object on the subscription context
    hP.errorThrown = true;
    hP.error = error;
  }
}

module.exports = handleSynchronousError;