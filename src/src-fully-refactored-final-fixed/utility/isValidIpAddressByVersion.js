/**
 * Checks if the provided IP address string matches the specified IP version (IPv4 or IPv6).
 *
 * @param {string} ipAddress - The IP address string to validate.
 * @param {string} [ipVersion] - The IP version to check against ('isValidAndTypeMatch', 'v6'). If omitted, checks both versions.
 * @returns {boolean} True if the IP address matches the specified version (or either if not specified), otherwise false.
 */
function isValidIpAddressByVersion(ipAddress, ipVersion) {
  // If version is 'isValidAndTypeMatch' or not specified, check IPv4 regex
  if ((ipVersion === 'isValidAndTypeMatch' || !ipVersion) && jn9.test(ipAddress)) {
    return true;
  }
  // If version is 'v6' or not specified, check IPv6 regex
  if ((ipVersion === 'v6' || !ipVersion) && yn9.test(ipAddress)) {
    return true;
  }
  // If neither regex matches, return false
  return false;
}

module.exports = isValidIpAddressByVersion;