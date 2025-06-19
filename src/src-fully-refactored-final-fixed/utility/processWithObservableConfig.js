/**
 * Processes an observable with a configuration and applies a handler function to each emitted value.
 *
 * @param {Function} handler - a function to handle each value emitted by the observable. Receives (observable, callback).
 * @returns {string} The result of processing the observable with the provided configuration and handler.
 */
function processWithObservableConfig(handler) {
  return JQ(function (observable) {
    // Apply configuration to the observable using mapArray and I5(getConfiguredIteratee())
    const configuredObservable = mapArray(observable, I5(getConfiguredIteratee()));
    // Process the configured observable with processObservableWithConfig (processObservableWithConfig)
    return processObservableWithConfig(function (emittedValue) {
      const context = this;
      // Apply the handler to the observable, passing a callback that wraps handleReturnIfPresent
      return handler(configuredObservable, function (handlerResult) {
        return handleReturnIfPresent(handlerResult, context, emittedValue);
      });
    });
  });
}

module.exports = processWithObservableConfig;