/**
 * Creates an Observable that immediately emits an error using the provided error factory or value.
 * Optionally schedules the error emission using a scheduler if provided.
 *
 * @param {Function|any} errorFactoryOrValue - a function that returns an error value, or the error value itself.
 * @param {Object} [scheduler] - Optional scheduler object with a schedule method to control when the error is emitted.
 * @returns {Observable} An Observable that emits an error when subscribed to.
 */
function createErrorObservable(errorFactoryOrValue, scheduler) {
  // Determine the error factory function
  const getErrorValue = DL9.isFunction(errorFactoryOrValue)
    ? errorFactoryOrValue
    : function () {
        return errorFactoryOrValue;
      };

  /**
   * Emits an error to the subscriber using the error factory
   * @param {Object} subscriber - The subscriber object with an error method
   * @returns {*} The result of subscriber.error
   */
  const emitError = function (subscriber) {
    return subscriber.error(getErrorValue());
  };

  // If a scheduler is provided, schedule the error emission; otherwise, emit immediately
  return new ZL9.Observable(
    scheduler
      ? function (subscriber) {
          // Schedule the error emission with delay 0
          return scheduler.schedule(emitError, 0, subscriber);
        }
      : emitError
  );
}

module.exports = createErrorObservable;