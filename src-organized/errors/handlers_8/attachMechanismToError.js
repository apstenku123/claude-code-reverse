/**
 * Attaches or updates a mechanism property on an error object, optionally marking isBlobOrFileLikeObject as an exception group and assigning an exception updateSnapshotAndNotify.
 *
 * @param {Object} errorObject - The error object to which the mechanism will be attached or updated.
 * @param {any} exceptionId - The identifier to assign to the mechanism'createInteractionAccessor exception_id property.
 * @returns {void}
 */
function attachMechanismToError(errorObject, exceptionId) {
  // Ensure the error object has a mechanism property with default values if not already present
  if (!errorObject.mechanism) {
    errorObject.mechanism = {
      type: "generic",
      handled: true
    };
  }

  // If the error type is 'AggregateError', add the is_exception_group flag
  const isAggregateError = errorObject.type === "AggregateError";
  const aggregateErrorProperties = isAggregateError
    ? { is_exception_group: true }
    : {};

  // Update the mechanism property with merged values
  errorObject.mechanism = {
    ...errorObject.mechanism,
    ...aggregateErrorProperties,
    exception_id: exceptionId
  };
}

module.exports = attachMechanismToError;