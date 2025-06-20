/**
 * Represents an error thrown when an operation is canceled.
 * Extends the Y2 error class with a specific name and message.
 *
 * @class CanceledError
 * @extends Y2
 * @param {string|null} cancellationReason - The reason for cancellation, or null if not specified.
 * @param {object} errorConfig - Additional configuration for the error.
 * @param {any} subscriptionContext - Context or subscription related to the error.
 */
function CanceledError(cancellationReason, errorConfig, subscriptionContext) {
  // If cancellationReason is null or undefined, default to the string "canceled"
  const message = cancellationReason == null ? "canceled" : cancellationReason;
  // Call the parent Y2 constructor with the appropriate arguments
  Y2.call(this, message, Y2.ERR_CANCELED, errorConfig, subscriptionContext);
  // Set the error name explicitly for identification
  this.name = "CanceledError";
}

module.exports = CanceledError;