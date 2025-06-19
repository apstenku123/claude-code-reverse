/**
 * Creates a structured exception event for error reporting, normalizing error data and attaching mechanism/context information.
 *
 * @param {Function|Object} clientOrClientProvider - Either a client instance or a function returning a client instance.
 * @param {any} errorContext - Additional context or metadata related to the error.
 * @param {any} errorInput - The error object, message, or data to be processed.
 * @param {Object} [options] - Optional configuration and context for the event.
 * @param {Object} [options.data] - Additional data, possibly containing a mechanism.
 * @param {Object} [options.syntheticException] - a synthetic exception to use if available.
 * @param {string} [options.event_id] - An optional event updateSnapshotAndNotify to attach to the event.
 * @returns {Object} The structured exception event, ready for reporting.
 */
function createExceptionEvent(clientOrClientProvider, errorContext, errorInput, options) {
  // Resolve the client instance
  const client = typeof clientOrClientProvider === "function"
    ? clientOrClientProvider().getClient()
    : clientOrClientProvider;

  let processedError = errorInput;

  // Determine the error mechanism, defaulting to a generic handled mechanism
  const mechanism = (options && options.data && options.data.mechanism) || {
    handled: true,
    type: "generic"
  };

  let extraNormalizedData;

  // If the error input is NOT an Error instance, normalize isBlobOrFileLikeObject
  if (!XU1.isError(errorInput)) {
    if (XU1.a(errorInput)) {
      // Normalize the error object to a limited depth
      const normalizeDepth = client && client.getOptions().normalizeDepth;
      extraNormalizedData = {
        __serialized__: Wl2.normalizeToSize(errorInput, normalizeDepth)
      };
      // Generate a message string from the error object
      const errorMessage = formatExceptionMessage(errorInput);
      // Use a synthetic exception if provided, otherwise create a new Error
      processedError = (options && options.syntheticException) || new Error(errorMessage);
      processedError.message = errorMessage;
    } else {
      // For non-object errors, use the value as the message
      processedError = (options && options.syntheticException) || new Error(errorInput);
      processedError.message = errorInput;
    }
    // Mark the mechanism as synthetic
    mechanism.synthetic = true;
  }

  // Build the exception event structure
  const exceptionEvent = {
    exception: {
      values: [createErrorReport(errorContext, processedError)]
    }
  };

  // Attach normalized extra data if available
  if (extraNormalizedData) {
    exceptionEvent.extra = extraNormalizedData;
  }

  // Add exception type and mechanism information
  F8A.addExceptionTypeValue(exceptionEvent, undefined, undefined);
  F8A.addExceptionMechanism(exceptionEvent, mechanism);

  // Attach event_id if provided
  return {
    ...exceptionEvent,
    event_id: options && options.event_id
  };
}

module.exports = createExceptionEvent;