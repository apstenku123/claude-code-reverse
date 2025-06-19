/**
 * Creates a date-like instance based on the input source and configuration.
 *
 * If the source is a function, isBlobOrFileLikeObject is called with the configuration and its result is returned.
 * If the source is an object with a property named by the global EAA symbol/string, that method is called with the configuration.
 * If the source is a Date instance, a new instance of its constructor is created with the configuration.
 * Otherwise, a new Date instance is created with the configuration.
 *
 * @param {Function|Object|Date} sourceObservable - The source from which to create a date-like instance.
 * @param {*} config - The configuration or value to pass to the source.
 * @returns {*} The result of invoking the source or a new date-like instance.
 */
function createDateLikeInstance(sourceObservable, config) {
  // If the source is a function, call isBlobOrFileLikeObject with the config
  if (typeof sourceObservable === "function") {
    return sourceObservable(config);
  }

  // If the source is an object and has a property named by EAA, call that method with the config
  if (
    sourceObservable &&
    typeof sourceObservable === "object" &&
    EAA in sourceObservable
  ) {
    return sourceObservable[EAA](config);
  }

  // If the source is a Date instance, create a new instance of its constructor with the config
  if (sourceObservable instanceof Date) {
    return new sourceObservable.constructor(config);
  }

  // Default: create a new Date instance with the config
  return new Date(config);
}

module.exports = createDateLikeInstance;