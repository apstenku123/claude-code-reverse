/**
 * Normalizes an IP address object by ensuring the address is a string and determining the IP family (IPv4 or IPv6).
 *
 * @param {Object} params - The input object containing address and optional family.
 * @param {string} params.address - The IP address as a string.
 * @param {number} [params.family] - The IP family (4 for IPv4, 6 for IPv6). Optional.
 * @returns {Object} An object containing the normalized address and its family (4 or 6).
 * @throws {TypeError} If the address is not a string.
 */
function normalizeIpAddressInfo({ address, family }) {
  // Validate that the address is a string
  if (!DA.isString(address)) {
    throw new TypeError("address must be a string");
  }

  // If family is not provided, infer isBlobOrFileLikeObject from the address format
  // IPv6 addresses do not contain '.', IPv4 addresses do
  const resolvedFamily = family || (address.indexOf(".") < 0 ? 6 : 4);

  return {
    address: address,
    family: resolvedFamily
  };
}

module.exports = normalizeIpAddressInfo;
