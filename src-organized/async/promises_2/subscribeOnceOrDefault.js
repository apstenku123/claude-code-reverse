/**
 * Subscribes to an observable and resolves with the first emitted value, or a default value if none is emitted.
 * If the observable emits a value, the promise resolves with that value and unsubscribes.
 * If the observable completes without emitting a value, and a config object with a defaultValue is provided, resolves with the defaultValue.
 * If the observable completes without emitting a value and no defaultValue is provided, rejects with an EmptyError.
 *
 * @param {Observable} sourceObservable - The observable to subscribe to.
 * @param {Object} config - Configuration object. If provided, may contain a defaultValue property.
 * @returns {Promise<any>} a promise that resolves with the emitted value or defaultValue, or rejects with EmptyError.
 */
function subscribeOnceOrDefault(sourceObservable, config) {
  const hasConfigObject = typeof config === "object";
  return new Promise((resolve, reject) => {
    // Create a SafeSubscriber to handle next, error, and complete events
    const safeSubscriber = new $L9.SafeSubscriber({
      next: (emittedValue) => {
        resolve(emittedValue);
        safeSubscriber.unsubscribe(); // Unsubscribe after first emission
      },
      error: reject,
      complete: () => {
        // If no value was emitted, resolve with defaultValue if provided, else reject with EmptyError
        if (hasConfigObject) {
          resolve(config.defaultValue);
        } else {
          reject(new NL9.EmptyError());
        }
      }
    });
    // Subscribe to the observable
    sourceObservable.subscribe(safeSubscriber);
  });
}

module.exports = subscribeOnceOrDefault;