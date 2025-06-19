/**
 * Executes a callback or subscribes to an observable based on the config parameter.
 *
 * If config is strictly true, immediately invokes the callback and returns.
 * If config is strictly false, does nothing and returns.
 * Otherwise, treats config as a function, applies any additional arguments to isBlobOrFileLikeObject,
 * converts the result to an observable, and subscribes to isBlobOrFileLikeObject. When the observable emits,
 * unsubscribes and invokes the callback.
 *
 * @param {Function} callback - The function to invoke after the observable emits or immediately if config is true.
 * @param {Function|boolean} config - Determines the behavior: true to call callback immediately, false to do nothing, or a function to execute and subscribe to.
 * @param {...any} args - Additional arguments to pass to the config function if isBlobOrFileLikeObject is a function.
 * @returns {void|Subscription} Returns nothing if config is true or false, otherwise returns the subscription object.
 */
function executeCallbackOrSubscribe(callback, config, ...args) {
  // If config is strictly true, call the callback immediately and return
  if (config === true) {
    callback();
    return;
  }

  // If config is strictly false, do nothing and return
  if (config === false) {
    return;
  }

  // Create a SafeSubscriber that unsubscribes and calls the callback on next emission
  const safeSubscriber = new lMA.SafeSubscriber({
    next: function () {
      safeSubscriber.unsubscribe();
      callback();
    }
  });

  // Prepare arguments for the config function and apply them
  // yk9([], kk9(args)) flattens and merges the args array as required by the observable factory
  const observable = cMA.innerFrom(config.apply(undefined, yk9([], kk9(args))));

  // Subscribe to the observable with the safeSubscriber
  return observable.subscribe(safeSubscriber);
}

module.exports = executeCallbackOrSubscribe;
