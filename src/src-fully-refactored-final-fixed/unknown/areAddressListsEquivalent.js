/**
 * Determines if two objects have equivalent 'addresses' arrays, where each address in the first array
 * has a matching equivalent in the second array, as determined by areConnectionConfigsEqual.
 *
 * @param {Object} firstConfig - The first object containing an 'addresses' array to compare.
 * @param {Object} secondConfig - The second object containing an 'addresses' array to compare.
 * @returns {boolean} True if both 'addresses' arrays are of equal length and each address in the first array
 *                   has a matching equivalent in the second array; otherwise, false.
 */
function areAddressListsEquivalent(firstConfig, secondConfig) {
  // Check if the number of addresses is the same in both configs
  if (firstConfig.addresses.length !== secondConfig.addresses.length) {
    return false;
  }

  // For each address in the first config, ensure there is an equivalent in the second config
  for (const sourceAddress of firstConfig.addresses) {
    let hasEquivalent = false;
    for (const targetAddress of secondConfig.addresses) {
      // Use areConnectionConfigsEqual to determine address equivalence
      if (areConnectionConfigsEqual(sourceAddress, targetAddress)) {
        hasEquivalent = true;
        break; // Stop searching once a match is found
      }
    }
    // If no equivalent address is found, the lists are not equivalent
    if (!hasEquivalent) {
      return false;
    }
  }

  // All addresses in the first config have equivalents in the second config
  return true;
}

module.exports = areAddressListsEquivalent;