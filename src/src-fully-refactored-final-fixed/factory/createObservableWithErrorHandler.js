/**
 * Creates a new Observable that immediately emits an error using the provided error factory.
 * Optionally, schedules the error emission using a scheduler if provided.
 *
 * @param {Function|any} errorFactoryOrValue - a function that returns an error value, or a direct error value.
 * @param {Object} [scheduler] - Optional scheduler object with a schedule method to control when the error is emitted.
 * @returns {ZL9.Observable} An Observable that emits the error produced by the error factory or value.
 */
function createObservableWithErrorHandler(errorFactoryOrValue, scheduler) {
  // Determine the error factory function
  const errorFactory = DL9.isFunction(errorFactoryOrValue)
    ? errorFactoryOrValue
    : function () {
        return errorFactoryOrValue;
      };

  /**
   * Emits an error to the observer using the error factory.
   * @param {Object} observer - The observer to emit the error to.
   * @returns {*} The result of observer.error().
   */
  const emitError = function (observer) {
    return observer.error(errorFactory());
  };

  // If a scheduler is provided, schedule the error emission; otherwise, emit immediately
  const observableInitializer = scheduler
    ? function (observer) {
        // Schedule the error emission with the provided scheduler
        return scheduler.schedule(emitError, 0, observer);
      }
    : emitError;

  // Return a new Observable that emits the error
  return new ZL9.Observable(observableInitializer);
}

module.exports = createObservableWithErrorHandler;