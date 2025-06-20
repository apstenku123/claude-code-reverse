/**
 * Checks if the provided source value matches the criteria defined by the config and subscription.
 *
 * @param {string} sourceValue - The value to be tested against the configuration.
 * @param {any} configOptions - The configuration options used to create the matcher.
 * @param {any} subscriptionOptions - Additional options for the matcher.
 * @returns {boolean} Returns true if the sourceValue matches the criteria; otherwise, false.
 */
function isSourceMatchingConfig(sourceValue, configOptions, subscriptionOptions) {
  let matcher;
  try {
    // Attempt to create a matcher instance with the given config and subscription options
    matcher = new fL6(configOptions, subscriptionOptions);
  } catch (error) {
    // If instantiation fails, return false
    return false;
  }
  // Use the matcher to test the source value
  return matcher.test(sourceValue);
}

module.exports = isSourceMatchingConfig;