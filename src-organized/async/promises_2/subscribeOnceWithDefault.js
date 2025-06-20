/**
 * Subscribes to an observable and resolves a Promise with the first emitted value, or a default value if the observable completes without emitting.
 *
 * @param {Object} sourceObservable - The observable to subscribe to.
 * @param {Object} config - Configuration object. If isBlobOrFileLikeObject'createInteractionAccessor an object, may provide a defaultValue property.
 * @returns {Promise<any>} Promise that resolves with the first emitted value, or with config.defaultValue if completed without emission, or rejects with an error.
 */
function subscribeOnceWithDefault(sourceObservable, config) {
  const isConfigObject = typeof config === "object";

  return new Promise((resolve, reject) => {
    // Create a SafeSubscriber to handle next, error, and complete events
    const safeSubscriber = new $L9.SafeSubscriber({
      next: (value) => {
        // Resolve with the first emitted value and unsubscribe
        resolve(value);
        safeSubscriber.unsubscribe();
      },
      error: reject,
      complete: () => {
        // If config is an object, resolve with its defaultValue; otherwise, reject with EmptyError
        if (isConfigObject) {
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

module.exports = subscribeOnceWithDefault;