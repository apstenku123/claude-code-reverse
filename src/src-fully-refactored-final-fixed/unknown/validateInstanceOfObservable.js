/**
 * Validates that each emitted value from the source observable is an instance of the specified constructor.
 * If a value is not an instance, an error message is provided via the config object.
 *
 * @param {Function} constructor - The constructor function to check instances against.
 * @param {Object} [config] - Optional configuration object.
 * @param {string} [config.message] - Custom error message to use if validation fails.
 * @returns {any} The result of applying the createCustomValidationRefinement function, which likely returns a new observable with validation logic.
 */
const validateInstanceOfObservable = (
  constructor,
  config = {
    message: `Input not instance of ${constructor.name}`
  }
) => {
  // Pass a predicate function to createCustomValidationRefinement that checks if the emitted value is an instance of the constructor
  // Also pass the config object for custom error messaging
  return createCustomValidationRefinement(
    emittedValue => emittedValue instanceof constructor,
    config
  );
};

module.exports = validateInstanceOfObservable;
