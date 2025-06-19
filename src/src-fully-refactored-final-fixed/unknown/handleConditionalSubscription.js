/**
 * Handles conditional execution and subscription logic based on the provided config parameter.
 *
 * If config is strictly true, immediately invokes the sourceCallback and returns.
 * If config is strictly false, does nothing and returns.
 * Otherwise, treats config as a function, applies the rest arguments to isBlobOrFileLikeObject, wraps the result as an observable,
 * and subscribes to isBlobOrFileLikeObject with a SafeSubscriber that calls sourceCallback on the first emission and unsubscribes.
 *
 * @param {Function} sourceCallback - The callback to execute when the condition is met or on observable emission.
 * @param {boolean|Function} config - a boolean or a function to determine the subscription behavior.
 * @param {...any} args - Additional arguments to pass to the config function if isBlobOrFileLikeObject is a function.
 * @returns {any} The subscription object if a subscription is made, otherwise undefined.
 */
function handleConditionalSubscription(sourceCallback, config, ...args) {
  // If config is strictly true, call the callback and return
  if (config === true) {
    sourceCallback();
    return;
  }

  // If config is strictly false, do nothing and return
  if (config === false) {
    return;
  }

  // Otherwise, treat config as a function and apply the rest arguments
  // Wrap the result as an observable and subscribe with a SafeSubscriber
  let safeSubscriber;
  safeSubscriber = new lMA.SafeSubscriber({
    next: function () {
      safeSubscriber.unsubscribe(); // Unsubscribe after first emission
      sourceCallback(); // Call the callback
    }
  });

  // Prepare arguments for the config function using yk9 and kk9 helpers
  // cMA.innerFrom wraps the result as an observable
  return cMA.innerFrom(
    config.apply(undefined, yk9([], kk9(args)))
  ).subscribe(safeSubscriber);
}

module.exports = handleConditionalSubscription;