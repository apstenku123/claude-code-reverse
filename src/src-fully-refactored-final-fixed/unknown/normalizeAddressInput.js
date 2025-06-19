/**
 * Normalizes an address input into a standard object format and determines its IP family.
 *
 * If the input is already an object, isBlobOrFileLikeObject is passed directly to the normalization function.
 * Otherwise, the input is assumed to be an address string, and an object is constructed
 * with the provided address and optional family.
 *
 * @param {object|string} addressInput - Either an address object or a string representing the address.
 * @param {string|number} [ipFamily] - Optional. The IP family (e.g., 'IPv4', 'IPv6', 4, or 6).
 * @returns {object} The normalized address information, including validation and determined family.
 */
const normalizeAddressInput = (addressInput, ipFamily) => {
  // Check if the input is already an object (e.g., { address, family })
  if (DA.isObject(addressInput)) {
    return normalizeIpAddressInfo(addressInput);
  }

  // Otherwise, construct an object with address and family
  return normalizeIpAddressInfo({
    address: addressInput,
    family: ipFamily
  });
};

module.exports = normalizeAddressInput;
