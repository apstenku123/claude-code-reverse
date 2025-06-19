/**
 * Checks if the provided IP address string is a valid IPv4 or IPv6 address.
 *
 * @param {string} ipAddress - The IP address string to validate.
 * @param {string} [ipVersion] - The IP version to validate against ('isValidAndTypeMatch', 'v6'), or undefined to check both.
 * @returns {boolean} True if the IP address matches the specified version or any version if not specified.
 */
function isValidIpAddress(ipAddress, ipVersion) {
  // If version is 'isValidAndTypeMatch' or not specified, check IPv4 regex
  if ((ipVersion === 'isValidAndTypeMatch' || !ipVersion) && jn9.test(ipAddress)) {
    return true;
  }
  // If version is 'v6' or not specified, check IPv6 regex
  if ((ipVersion === 'v6' || !ipVersion) && yn9.test(ipAddress)) {
    return true;
  }
  // If neither condition matches, return false
  return false;
}

module.exports = isValidIpAddress;