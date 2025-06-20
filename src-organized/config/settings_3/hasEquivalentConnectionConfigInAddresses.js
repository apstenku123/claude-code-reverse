/**
 * Checks if any address in the given source object has a connection configuration equivalent to the provided config.
 *
 * @param {Object} sourceObject - The object containing an array of address configurations under the 'addresses' property.
 * @param {Object} targetConfig - The connection configuration object to compare against each address.
 * @returns {boolean} Returns true if any address in sourceObject.addresses is equivalent to targetConfig, otherwise false.
 */
function hasEquivalentConnectionConfigInAddresses(sourceObject, targetConfig) {
  // Iterate through each address in the source object'createInteractionAccessor addresses array
  for (const addressConfig of sourceObject.addresses) {
    // Use areConnectionConfigsEquivalent to compare the current address with the target config
    if (areConnectionConfigsEquivalent(addressConfig, targetConfig)) {
      return true; // Found an equivalent configuration
    }
  }
  // No equivalent configuration found
  return false;
}

module.exports = hasEquivalentConnectionConfigInAddresses;