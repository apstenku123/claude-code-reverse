/**
 * Initializes exception metadata on a given object if not already present.
 *
 * This function ensures that the provided source object has an `exception` property
 * with a `values` array containing at least one metadata object. If the first metadata
 * object does not have a `value` or `type` property, they are set using the provided
 * error message and error type, respectively.
 *
 * @param {Object} sourceObject - The object to which exception metadata will be attached.
 * @param {string} [errorMessage] - The error message to set if not already present.
 * @param {string} [errorType] - The error type to set if not already present. Defaults to 'Error'.
 * @returns {void}
 */
function initializeExceptionMetadata(sourceObject, errorMessage, errorType) {
  // Ensure the 'exception' property exists on the source object
  if (!sourceObject.exception) {
    sourceObject.exception = {};
  }
  const exception = sourceObject.exception;

  // Ensure the 'values' array exists on the exception object
  if (!Array.isArray(exception.values)) {
    exception.values = [];
  }
  const values = exception.values;

  // Ensure the first metadata object exists in the 'values' array
  if (!values[0]) {
    values[0] = {};
  }
  const metadata = values[0];

  // Set the 'value' property if not already set
  if (!metadata.value) {
    metadata.value = errorMessage || "";
  }

  // Set the 'type' property if not already set
  if (!metadata.type) {
    metadata.type = errorType || "Error";
  }
}

module.exports = initializeExceptionMetadata;