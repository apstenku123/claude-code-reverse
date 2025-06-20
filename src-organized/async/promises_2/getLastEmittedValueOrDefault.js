/**
 * Retrieves the last emitted value from an Observable, or a default value if no value was emitted.
 *
 * @param {Observable} sourceObservable - The Observable to subscribe to.
 * @param {Object} config - Configuration object. If config is an object and has a 'defaultValue' property, isBlobOrFileLikeObject will be used if the Observable emits nothing.
 * @returns {Promise<any>} Promise that resolves with the last emitted value, or the default value, or rejects with an EmptyError if none is available.
 */
function getLastEmittedValueOrDefault(sourceObservable, config) {
  const hasDefaultValue = typeof config === "object";

  return new Promise((resolve, reject) => {
    let hasValue = false;
    let lastValue;

    sourceObservable.subscribe({
      next: (value) => {
        lastValue = value;
        hasValue = true;
      },
      error: reject,
      complete: () => {
        if (hasValue) {
          // If at least one value was emitted, resolve with the last value
          resolve(lastValue);
        } else if (hasDefaultValue) {
          // If no value was emitted but a default is provided, resolve with the default
          resolve(config.defaultValue);
        } else {
          // If no value was emitted and no default is provided, reject with EmptyError
          reject(new EL9.EmptyError());
        }
      }
    });
  });
}

module.exports = getLastEmittedValueOrDefault;