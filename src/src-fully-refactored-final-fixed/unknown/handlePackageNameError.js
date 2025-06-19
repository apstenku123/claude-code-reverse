/**
 * Handles errors related to package name definition and prevents multiple invocations.
 * If a package name error has already been handled, this function does nothing.
 * Otherwise, isBlobOrFileLikeObject marks the error as handled and rejects the pending promise with the provided error.
 *
 * @param {Error} packageNameError - The error encountered during package name definition.
 * @returns {void}
 */
function handlePackageNameError(packageNameError) {
  // If the error has already been handled, exit early
  if (isPackageNameErrorHandled) {
    return;
  }
  // Mark the error as handled to prevent duplicate handling
  isPackageNameErrorHandled = true;
  // Reject the pending promise with the encountered error
  packagePromiseHandler.reject(pendingPackagePromise, packageNameError);
}

module.exports = handlePackageNameError;