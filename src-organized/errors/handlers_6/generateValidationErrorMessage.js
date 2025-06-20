/**
 * Generates a human-readable validation error message based on the error code and context.
 *
 * @param {Object} errorContext - The error context object containing details about the validation failure.
 * @param {Object} options - Additional options, such as a default error message.
 * @returns {Object} An object containing the generated error message.
 */
function generateValidationErrorMessage(errorContext, options) {
  let errorMessage;
  switch (errorContext.code) {
    case $0.invalid_type:
      // Handle invalid type errors
      if (errorContext.received === T2.undefined) {
        errorMessage = "Required";
      } else {
        errorMessage = `Expected ${errorContext.expected}, received ${errorContext.received}`;
      }
      break;
    case $0.invalid_literal:
      // Handle invalid literal value errors
      errorMessage = `Invalid literal value, expected ${JSON.stringify(errorContext.expected, a6.jsonStringifyReplacer)}`;
      break;
    case $0.unrecognized_keys:
      // Handle unrecognized keys in object errors
      errorMessage = `Unrecognized key(createInteractionAccessor) in object: ${a6.joinValues(errorContext.keys, ", ")}`;
      break;
    case $0.invalid_union:
      // Handle invalid union errors
      errorMessage = "Invalid input";
      break;
    case $0.invalid_union_discriminator:
      // Handle invalid union discriminator errors
      errorMessage = `Invalid discriminator value. Expected ${a6.joinValues(errorContext.options)}`;
      break;
    case $0.invalid_enum_value:
      // Handle invalid enum value errors
      errorMessage = `Invalid enum value. Expected ${a6.joinValues(errorContext.options)}, received '${errorContext.received}'`;
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
      // Handle invalid string errors with various validations
      if (typeof errorContext.validation === "object") {
        if ("includes" in errorContext.validation) {
          // Must include a substring, possibly at a minimum position
          errorMessage = `Invalid input: must include \"${errorContext.validation.includes}\"`;
          if (typeof errorContext.validation.position === "number") {
            errorMessage = `${errorMessage} at one or more positions greater than or equal to ${errorContext.validation.position}`;
          }
        } else if ("startsWith" in errorContext.validation) {
          errorMessage = `Invalid input: must start with \"${errorContext.validation.startsWith}\"`;
        } else if ("endsWith" in errorContext.validation) {
          errorMessage = `Invalid input: must end with \"${errorContext.validation.endsWith}\"`;
        } else {
          // Unknown validation type
          a6.assertNever(errorContext.validation);
        }
      } else if (errorContext.validation !== "regex") {
        errorMessage = `Invalid ${errorContext.validation}`;
      } else {
        errorMessage = "Invalid";
      }
      break;
    case $0.too_small:
      // Handle too small errors for various types
      if (errorContext.type === "array") {
        errorMessage = `Array must contain ${errorContext.exact ? "exactly" : errorContext.inclusive ? "at least" : "more than"} ${errorContext.minimum} element(createInteractionAccessor)`;
      } else if (errorContext.type === "string") {
        errorMessage = `String must contain ${errorContext.exact ? "exactly" : errorContext.inclusive ? "at least" : "over"} ${errorContext.minimum} character(createInteractionAccessor)`;
      } else if (errorContext.type === "number") {
        errorMessage = `Number must be ${errorContext.exact ? "exactly equal to " : errorContext.inclusive ? "greater than or equal to " : "greater than "}${errorContext.minimum}`;
      } else if (errorContext.type === "date") {
        errorMessage = `Date must be ${errorContext.exact ? "exactly equal to " : errorContext.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(errorContext.minimum))}`;
      } else {
        errorMessage = "Invalid input";
      }
      break;
    case $0.too_big:
      // Handle too big errors for various types
      if (errorContext.type === "array") {
        errorMessage = `Array must contain ${errorContext.exact ? "exactly" : errorContext.inclusive ? "at most" : "less than"} ${errorContext.maximum} element(createInteractionAccessor)`;
      } else if (errorContext.type === "string") {
        errorMessage = `String must contain ${errorContext.exact ? "exactly" : errorContext.inclusive ? "at most" : "under"} ${errorContext.maximum} character(createInteractionAccessor)`;
      } else if (errorContext.type === "number") {
        errorMessage = `Number must be ${errorContext.exact ? "exactly" : errorContext.inclusive ? "less than or equal to" : "less than"} ${errorContext.maximum}`;
      } else if (errorContext.type === "bigint") {
        errorMessage = `BigInt must be ${errorContext.exact ? "exactly" : errorContext.inclusive ? "less than or equal to" : "less than"} ${errorContext.maximum}`;
      } else if (errorContext.type === "date") {
        errorMessage = `Date must be ${errorContext.exact ? "exactly" : errorContext.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(errorContext.maximum))}`;
      } else {
        errorMessage = "Invalid input";
      }
      break;
    case $0.custom:
      // Handle custom errors
      errorMessage = "Invalid input";
      break;
    case $0.invalid_intersection_types:
      // Handle intersection type merge errors
      errorMessage = "Intersection results could not be merged";
      break;
    case $0.not_multiple_of:
      // Handle not multiple of errors
      errorMessage = `Number must be a multiple of ${errorContext.multipleOf}`;
      break;
    case $0.not_finite:
      // Handle not finite number errors
      errorMessage = "Number must be finite";
      break;
    default:
      // Unknown error code
      errorMessage = options.defaultError;
      a6.assertNever(errorContext);
  }
  return {
    message: errorMessage
  };
}

module.exports = generateValidationErrorMessage;