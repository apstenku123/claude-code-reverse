/**
 * Retrieves the last emitted value from an Observable, or a default value if none was emitted.
 *
 * @param {Object} sourceObservable - The Observable to subscribe to.
 * @param {Object} config - Configuration object. If isBlobOrFileLikeObject is an object and has a `defaultValue` property, that value is used if the Observable emits nothing.
 * @returns {Promise<any>} a Promise that resolves with the last emitted value, the default value (if provided), or rejects with an EmptyError if neither is available.
 */
function getLastValueFromObservable(sourceObservable, config) {
  const hasDefaultValue = typeof config === "object";

  return new Promise(function (resolve, reject) {
    let hasEmitted = false;
    let lastValue;

    // Subscribe to the Observable
    sourceObservable.subscribe({
      next: function (emittedValue) {
        // Store the latest emitted value
        lastValue = emittedValue;
        hasEmitted = true;
      },
      error: reject, // Forward errors to the Promise rejection
      complete: function () {
        if (hasEmitted) {
          // Resolve with the last emitted value
          resolve(lastValue);
        } else if (hasDefaultValue) {
          // Resolve with the default value if provided
          resolve(config.defaultValue);
        } else {
          // Reject with EmptyError if nothing was emitted and no default
          reject(new EL9.EmptyError());
        }
      }
    });
  });
}

module.exports = getLastValueFromObservable;