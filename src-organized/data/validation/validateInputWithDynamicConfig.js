/**
 * Validates the given input using a dynamically constructed configuration object.
 *
 * Attempts to create a new instance of the Validator class (fL6) using the provided config and subscription parameters.
 * If instantiation fails, returns false. Otherwise, calls the test method of the Validator instance with the input value.
 *
 * @param {string} inputValue - The value to be validated.
 * @param {object} configOptions - Configuration options for the Validator.
 * @param {any} subscriptionValue - Value used for subscription or randomization in the Validator.
 * @returns {boolean} True if the input passes validation, false otherwise or if instantiation fails.
 */
const validateInputWithDynamicConfig = (inputValue, configOptions, subscriptionValue) => {
  let validatorInstance;
  try {
    // Attempt to create a new Validator instance with the provided config and subscription
    validatorInstance = new fL6(configOptions, subscriptionValue);
  } catch (error) {
    // If instantiation fails, return false
    return false;
  }
  // Use the Validator'createInteractionAccessor test method to validate the input
  return validatorInstance.test(inputValue);
};

module.exports = validateInputWithDynamicConfig;
