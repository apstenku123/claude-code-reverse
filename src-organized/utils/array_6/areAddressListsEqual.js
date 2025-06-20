/**
 * Compares the 'addresses' arrays of two objects to determine if they are equal.
 * Each address is compared using the 'areConnectionConfigsEqual' function.
 *
 * @param {Object} firstObject - The first object containing an 'addresses' array.
 * @param {Object} secondObject - The second object containing an 'addresses' array.
 * @returns {boolean} Returns true if both 'addresses' arrays are of the same length and all corresponding addresses are equal; otherwise, false.
 */
function areAddressListsEqual(firstObject, secondObject) {
  // Check if both 'addresses' arrays have the same length
  if (firstObject.addresses.length !== secondObject.addresses.length) {
    return false;
  }

  // Compare each address in the arrays using areConnectionConfigsEqual
  for (let index = 0; index < firstObject.addresses.length; index++) {
    const firstAddress = firstObject.addresses[index];
    const secondAddress = secondObject.addresses[index];
    if (!areConnectionConfigsEqual(firstAddress, secondAddress)) {
      return false;
    }
  }

  // All addresses matched
  return true;
}

module.exports = areAddressListsEqual;