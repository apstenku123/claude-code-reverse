/**
 * Checks if any address in the given observable'createInteractionAccessor addresses array matches the provided connection configuration.
 *
 * @param {Object} observable - The observable object containing an array of address configurations.
 * @param {Object} connectionConfig - The connection configuration object to compare against each address.
 * @returns {boolean} True if a matching address configuration is found, otherwise false.
 */
function hasMatchingAddressConfig(observable, connectionConfig) {
  // Iterate over each address in the observable'createInteractionAccessor addresses array
  for (const address of observable.addresses) {
    // Use areConnectionConfigsEqual to check if the address matches the provided configuration
    if (areConnectionConfigsEqual(address, connectionConfig)) {
      return true; // Return true immediately if a match is found
    }
  }
  // Return false if no matching address configuration is found
  return false;
}

module.exports = hasMatchingAddressConfig;