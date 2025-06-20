/**
 * Validates that each emitted value from the provided observable is an instance of the specified constructor.
 * If a value is not an instance, an error message is provided from the config.
 *
 * @param {Function} constructor - The constructor function to check instances against.
 * @param {Object} [config] - Optional configuration object.
 * @param {string} [config.message] - Custom error message if validation fails. Defaults to 'Input not instance of <ConstructorName>'.
 * @returns {any} The result of calling createCustomValidationRefinement with the validation function and config.
 */
const validateInstanceOf = (
  constructor,
  config = {
    message: `Input not instance of ${constructor.name}`
  }
) => {
  // Pass a predicate function to createCustomValidationRefinement that checks if the value is an instance of the constructor
  return createCustomValidationRefinement(
    value => value instanceof constructor,
    config
  );
};

module.exports = validateInstanceOf;
