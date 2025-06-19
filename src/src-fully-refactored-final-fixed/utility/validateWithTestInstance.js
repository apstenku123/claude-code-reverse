/**
 * Attempts to create a test instance with the provided configuration and subscription,
 * then tests the given source value using the test method of the created instance.
 * Returns false if instantiation fails.
 *
 * @param {string} sourceValue - The value to be tested.
 * @param {any} config - The configuration object or value for the test instance.
 * @param {any} subscription - The subscription or options required for the test instance.
 * @returns {boolean} True if the test passes, false otherwise or if instantiation fails.
 */
const validateWithTestInstance = (sourceValue, config, subscription) => {
  let testInstance;
  try {
    // Attempt to create a new test instance with the provided config and subscription
    testInstance = new fL6(config, subscription);
  } catch (error) {
    // If instantiation fails, return false
    return false;
  }
  // Use the test method of the instance to validate the source value
  return testInstance.test(sourceValue);
};

module.exports = validateWithTestInstance;