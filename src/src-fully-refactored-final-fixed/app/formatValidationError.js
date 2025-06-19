/**
 * Formats a validation error object into a human-readable error message.
 *
 * @param {Object} error - The error object containing details about the validation failure.
 * @param {Object} options - Additional options, such as a default error message.
 * @returns {Object} An object with a single 'message' property containing the formatted error message.
 */
function formatValidationError(error, options) {
  let errorMessage;
  switch (error.code) {
    case $0.invalid_type:
      // Handle missing required fields or type mismatches
      if (error.received === T2.undefined) {
        errorMessage = "Required";
      } else {
        errorMessage = `Expected ${error.expected}, received ${error.received}`;
      }
      break;
    case $0.invalid_literal:
      // Handle invalid literal values
      errorMessage = `Invalid literal value, expected ${JSON.stringify(error.expected, a6.jsonStringifyReplacer)}`;
      break;
    case $0.unrecognized_keys:
      // Handle unrecognized keys in an object
      errorMessage = `Unrecognized key(createInteractionAccessor) in object: ${a6.joinValues(error.keys, ", ")}`;
      break;
    case $0.invalid_union:
      // Handle invalid union types
      errorMessage = "Invalid input";
      break;
    case $0.invalid_union_discriminator:
      // Handle invalid union discriminator values
      errorMessage = `Invalid discriminator value. Expected ${a6.joinValues(error.options)}`;
      break;
    case $0.invalid_enum_value:
      // Handle invalid enum values
      errorMessage = `Invalid enum value. Expected ${a6.joinValues(error.options)}, received '${error.received}'`;
      break;
    case $0.invalid_arguments:
      // Handle invalid function arguments
      errorMessage = "Invalid function arguments";
      break;
    case $0.invalid_return_type:
      // Handle invalid function return types
      errorMessage = "Invalid function return type";
      break;
    case $0.invalid_date:
      // Handle invalid date values
      errorMessage = "Invalid date";
      break;
    case $0.invalid_string:
      // Handle invalid string validations
      if (typeof error.validation === "object") {
        if ("includes" in error.validation) {
          // String must include a certain substring
          errorMessage = `Invalid input: must include \"${error.validation.includes}\"`;
          if (typeof error.validation.position === "number") {
            errorMessage = `${errorMessage} at one or more positions greater than or equal to ${error.validation.position}`;
          }
        } else if ("startsWith" in error.validation) {
          // String must start with a certain substring
          errorMessage = `Invalid input: must start with \"${error.validation.startsWith}\"`;
        } else if ("endsWith" in error.validation) {
          // String must end with a certain substring
          errorMessage = `Invalid input: must end with \"${error.validation.endsWith}\"`;
        } else {
          // Unknown validation type
          a6.assertNever(error.validation);
        }
      } else if (error.validation !== "regex") {
        // Other string validation errors
        errorMessage = `Invalid ${error.validation}`;
      } else {
        // Regex validation failed
        errorMessage = "Invalid";
      }
      break;
    case $0.too_small:
      // Handle too small values for various types
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
      // Handle too big values for various types
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
      // Handle custom validation errors
      errorMessage = "Invalid input";
      break;
    case $0.invalid_intersection_types:
      // Handle intersection type merge failures
      errorMessage = "Intersection results could not be merged";
      break;
    case $0.not_multiple_of:
      // Handle numbers not being a multiple of a given value
      errorMessage = `Number must be a multiple of ${error.multipleOf}`;
      break;
    case $0.not_finite:
      // Handle numbers that are not finite
      errorMessage = "Number must be finite";
      break;
    default:
      // Fallback for unknown error codes
      errorMessage = options.defaultError;
      a6.assertNever(error);
  }
  return {
    message: errorMessage
  };
}

module.exports = formatValidationError;
