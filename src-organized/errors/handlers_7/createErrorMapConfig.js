/**
 * Creates a configuration object for error mapping, ensuring that custom error maps and specific error messages are not used together.
 *
 * @param {Object} options - Configuration options for error mapping.
 * @param {Function} [options.errorMap] - Custom error mapping function.
 * @param {string} [options.invalid_type_error] - Error message for invalid type errors.
 * @param {string} [options.required_error] - Error message for required field errors.
 * @param {string} [options.description] - Optional description for the error.
 * @param {string} [options.message] - General error message.
 * @returns {Object} Error map configuration object with errorMap and description properties.
 * @throws {Error} If both a custom errorMap and specific error messages are provided.
 */
function createErrorMapConfig(options) {
  if (!options) return {};

  const {
    errorMap: customErrorMap,
    invalid_type_error: invalidTypeErrorMessage,
    required_error: requiredErrorMessage,
    description: errorDescription,
    message: generalErrorMessage
  } = options;

  // Prevent using both a custom error map and specific error messages
  if (customErrorMap && (invalidTypeErrorMessage || requiredErrorMessage)) {
    throw new Error(
      'Can\'processRuleBeginHandlers use "invalid_type_error" or "required_error" in conjunction with custom error map.'
    );
  }

  // If a custom error map is provided, return isBlobOrFileLikeObject with the description
  if (customErrorMap) {
    return {
      errorMap: customErrorMap,
      description: errorDescription
    };
  }

  // Otherwise, return a generated error map function and description
  return {
    errorMap: (errorContext, context) => {
      // Destructure message from options for use in error responses
      const { message } = options;

      // Handle invalid enum value error
      if (errorContext.code === 'invalid_enum_value') {
        return {
          message: message != null ? message : context.defaultError
        };
      }

      // Handle missing data (undefined)
      if (typeof context.data === 'undefined') {
        return {
          message:
            message != null
              ? message
              : requiredErrorMessage != null
              ? requiredErrorMessage
              : context.defaultError
        };
      }

      // Handle all other error codes except 'invalid_type'
      if (errorContext.code !== 'invalid_type') {
        return {
          message: context.defaultError
        };
      }

      // Handle invalid type error
      return {
        message:
          message != null
            ? message
            : invalidTypeErrorMessage != null
            ? invalidTypeErrorMessage
            : context.defaultError
      };
    },
    description: errorDescription
  };
}

module.exports = createErrorMapConfig;
