/**
 * Generates a human-readable validation error message based on the error object and configuration provided.
 *
 * @param {Object} error - The error object containing details about the validation failure.
 * @param {Object} config - Configuration object, typically containing a default error message.
 * @returns {Object} An object with a single 'message' property containing the error message string.
 */
function getValidationErrorMessage(error, config) {
  let errorMessage;
  switch (error.code) {
    case $0.invalid_type:
      // Handle invalid type errors
      if (error.received === T2.undefined) {
        errorMessage = "Required";
      } else {
        errorMessage = `Expected ${error.expected}, received ${error.received}`;
      }
      break;
    case $0.invalid_literal:
      // Handle invalid literal value errors
      errorMessage = `Invalid literal value, expected ${JSON.stringify(error.expected, a6.jsonStringifyReplacer)}`;
      break;
    case $0.unrecognized_keys:
      // Handle unrecognized keys in object errors
      errorMessage = `Unrecognized key(createInteractionAccessor) in object: ${a6.joinValues(error.keys, ", ")}`;
      break;
    case $0.invalid_union:
      // Handle invalid union errors
      errorMessage = "Invalid input";
      break;
    case $0.invalid_union_discriminator:
      // Handle invalid union discriminator errors
      errorMessage = `Invalid discriminator value. Expected ${a6.joinValues(error.options)}`;
      break;
    case $0.invalid_enum_value:
      // Handle invalid enum value errors
      errorMessage = `Invalid enum value. Expected ${a6.joinValues(error.options)}, received '${error.received}'`;
      break;
    case $0.invalid_arguments:
      // Handle invalid function arguments errors
      errorMessage = "Invalid function arguments";
      break;
    case $0.invalid_return_type:
      // Handle invalid function return type errors
      errorMessage = "Invalid function return type";
      break;
    case $0.invalid_date:
      // Handle invalid date errors
      errorMessage = "Invalid date";
      break;
    case $0.invalid_string:
      // Handle invalid string errors with detailed validation
      if (typeof error.validation === "object") {
        if ("includes" in error.validation) {
          // Must include a substring
          errorMessage = `Invalid input: must include \"${error.validation.includes}\"`;
          if (typeof error.validation.position === "number") {
            errorMessage = `${errorMessage} at one or more positions greater than or equal to ${error.validation.position}`;
          }
        } else if ("startsWith" in error.validation) {
          // Must start with a substring
          errorMessage = `Invalid input: must start with \"${error.validation.startsWith}\"`;
        } else if ("endsWith" in error.validation) {
          // Must end with a substring
          errorMessage = `Invalid input: must end with \"${error.validation.endsWith}\"`;
        } else {
          // Unknown validation type
          a6.assertNever(error.validation);
        }
      } else if (error.validation !== "regex") {
        // Other string validations
        errorMessage = `Invalid ${error.validation}`;
      } else {
        // Regex validation failed
        errorMessage = "Invalid";
      }
      break;
    case $0.too_small:
      // Handle too small errors for arrays, strings, numbers, and dates
      if (error.type === "array") {
        errorMessage = `Array must contain ${error.exact ? "exactly" : error.inclusive ? "at least" : "more than"} ${error.minimum} element(createInteractionAccessor)`;
      } else if (error.type === "string") {
        errorMessage = `String must contain ${error.exact ? "exactly" : error.inclusive ? "at least" : "over"} ${error.minimum} character(createInteractionAccessor)`;
      } else if (error.type === "number") {
        errorMessage = `Number must be ${error.exact ? "exactly equal to " : error.inclusive ? "greater than or equal to " : "greater than "}${error.minimum}`;
      } else if (error.type === "date") {
        errorMessage = `Date must be ${error.exact ? "exactly equal to " : error.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(error.minimum))}`;
      } else {
        errorMessage = "Invalid input";
      }
      break;
    case $0.too_big:
      // Handle too big errors for arrays, strings, numbers, bigints, and dates
      if (error.type === "array") {
        errorMessage = `Array must contain ${error.exact ? "exactly" : error.inclusive ? "at most" : "less than"} ${error.maximum} element(createInteractionAccessor)`;
      } else if (error.type === "string") {
        errorMessage = `String must contain ${error.exact ? "exactly" : error.inclusive ? "at most" : "under"} ${error.maximum} character(createInteractionAccessor)`;
      } else if (error.type === "number") {
        errorMessage = `Number must be ${error.exact ? "exactly" : error.inclusive ? "less than or equal to" : "less than"} ${error.maximum}`;
      } else if (error.type === "bigint") {
        errorMessage = `BigInt must be ${error.exact ? "exactly" : error.inclusive ? "less than or equal to" : "less than"} ${error.maximum}`;
      } else if (error.type === "date") {
        errorMessage = `Date must be ${error.exact ? "exactly" : error.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(error.maximum))}`;
      } else {
        errorMessage = "Invalid input";
      }
      break;
    case $0.custom:
      // Handle custom errors
      errorMessage = "Invalid input";
      break;
    case $0.invalid_intersection_types:
      // Handle intersection type errors
      errorMessage = "Intersection results could not be merged";
      break;
    case $0.not_multiple_of:
      // Handle not multiple of errors
      errorMessage = `Number must be a multiple of ${error.multipleOf}`;
      break;
    case $0.not_finite:
      // Handle not finite number errors
      errorMessage = "Number must be finite";
      break;
    default:
      // Handle unknown error codes
      errorMessage = config.defaultError;
      a6.assertNever(error);
  }
  return {
    message: errorMessage
  };
}

module.exports = getValidationErrorMessage;
