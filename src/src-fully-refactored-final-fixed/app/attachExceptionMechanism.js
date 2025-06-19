/**
 * Attaches or updates a 'mechanism' property on the given error object, describing how the error was handled.
 * If the error is an AggregateError, marks isBlobOrFileLikeObject as an exception group.
 * Always sets the provided exceptionId on the mechanism.
 *
 * @param {Object} errorObject - The error object to which the mechanism will be attached or updated.
 * @param {string|number} exceptionId - The unique identifier for this exception instance.
 * @returns {void}
 */
function attachExceptionMechanism(errorObject, exceptionId) {
  // Ensure the error object has a 'mechanism' property with default values if not already present
  if (!errorObject.mechanism) {
    errorObject.mechanism = {
      type: "generic",
      handled: true
    };
  }

  // If the error is an AggregateError, mark isBlobOrFileLikeObject as an exception group
  const isAggregateError = errorObject.type === "AggregateError";
  const aggregateErrorMechanism = isAggregateError ? { is_exception_group: true } : {};

  // Merge the mechanism properties, always setting the exception_id
  errorObject.mechanism = {
    ...errorObject.mechanism,
    ...aggregateErrorMechanism,
    exception_id: exceptionId
  };
}

module.exports = attachExceptionMechanism;