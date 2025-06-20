/**
 * Checks if the provided IP address string is a valid IPv4 or IPv6 address.
 *
 * @param {string} ipAddress - The IP address string to validate.
 * @param {string} [ipVersion] - The IP version to validate against ('isValidAndTypeMatch', 'v6'). If omitted, checks both.
 * @returns {boolean} True if the IP address is valid for the specified version, false otherwise.
 */
function isValidIpAddress(ipAddress, ipVersion) {
  // If version is 'isValidAndTypeMatch' or not specified, test against IPv4 regex
  if ((ipVersion === 'isValidAndTypeMatch' || !ipVersion) && _n9.test(ipAddress)) {
    return true;
  }
  // If version is 'v6' or not specified, test against IPv6 regex
  if ((ipVersion === 'v6' || !ipVersion) && kn9.test(ipAddress)) {
    return true;
  }
  // If neither test passes, return false
  return false;
}

module.exports = isValidIpAddress;