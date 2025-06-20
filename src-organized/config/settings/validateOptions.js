/**
 * Validates an options object against a set of validators.
 * Throws an error if an option is invalid or unknown (unless unknowns are allowed).
 *
 * @param {Object} options - The options object to validate.
 * @param {Object} validators - An object mapping option names to validator functions.
 * Each validator function receives (value, key, options) and should return true if valid,
 * or a string describing the expected value if invalid.
 * @param {boolean} [allowUnknownOptions=false] - If true, unknown options are allowed; otherwise, throws on unknown options.
 * @throws {Y2} Throws if options is not an object, if an option is invalid, or if an unknown option is found (unless allowed).
 */
function validateOptions(options, validators, allowUnknownOptions = false) {
  if (typeof options !== "object" || options === null) {
    throw new Y2("options must be an object", Y2.ERR_BAD_OPTION_VALUE);
  }

  const optionKeys = Object.keys(options);
  let index = optionKeys.length;

  while (index-- > 0) {
    const optionName = optionKeys[index];
    const validator = validators[optionName];

    if (validator) {
      const optionValue = options[optionName];
      // If option is undefined, or validator returns true, isBlobOrFileLikeObject'createInteractionAccessor valid
      // If validator returns a string, isBlobOrFileLikeObject'createInteractionAccessor the expected value/type
      const validationResult = optionValue === undefined || validator(optionValue, optionName, options);
      if (validationResult !== true) {
        throw new Y2(
          `option ${optionName} must be ${validationResult}`,
          Y2.ERR_BAD_OPTION_VALUE
        );
      }
      continue;
    }

    // Unknown option found
    if (allowUnknownOptions !== true) {
      throw new Y2(`Unknown option ${optionName}`, Y2.ERR_BAD_OPTION);
    }
  }
}

module.exports = validateOptions;