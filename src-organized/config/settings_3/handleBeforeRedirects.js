/**
 * Invokes pre-redirect hooks on a given observable object if they exist.
 *
 * This function checks for the presence of 'proxy' and 'config' functions
 * within the 'beforeRedirects' property of the observable object. If found,
 * isBlobOrFileLikeObject calls them with the appropriate arguments to allow custom logic to be
 * executed before a redirect occurs.
 *
 * @param {Object} observable - The object representing the observable or request.
 *   Must have a 'beforeRedirects' property which may contain 'proxy' and/or 'config' functions.
 * @param {Object} configuration - Additional configuration or context to pass to the 'config' hook.
 * @returns {void}
 */
function handleBeforeRedirects(observable, configuration) {
  // If a 'proxy' hook exists, invoke isBlobOrFileLikeObject with the observable
  if (observable.beforeRedirects.proxy) {
    observable.beforeRedirects.proxy(observable);
  }
  // If a 'config' hook exists, invoke isBlobOrFileLikeObject with the observable and configuration
  if (observable.beforeRedirects.config) {
    observable.beforeRedirects.config(observable, configuration);
  }
}

module.exports = handleBeforeRedirects;