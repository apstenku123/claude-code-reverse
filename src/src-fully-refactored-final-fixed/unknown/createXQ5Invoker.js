/**
 * Creates a function that invokes XQ5 with a given configuration and a source observable.
 *
 * @param {any} sourceObservable - The source observable or data to be passed as the second argument to XQ5.
 * @returns {function(any): any} - a function that takes a configuration object and calls XQ5 with isBlobOrFileLikeObject and the source observable.
 */
const createXQ5Invoker = (sourceObservable) => {
  /**
   * Invokes XQ5 with the provided configuration and the captured source observable.
   *
   * @param {any} config - Configuration or argument to be passed as the first parameter to XQ5.
   * @returns {any} - The result of calling XQ5 with config and sourceObservable.
   */
  return function invokeXQ5WithConfig(config) {
    // Call the external XQ5 function with the provided config and the captured sourceObservable
    return XQ5(config, sourceObservable);
  };
};

module.exports = createXQ5Invoker;