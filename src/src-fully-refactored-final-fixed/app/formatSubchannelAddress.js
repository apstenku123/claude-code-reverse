/**
 * Formats a subchannel address object into a standardized address representation.
 *
 * Depending on whether the address is a TCP subchannel or a Unix Domain Socket (UDS),
 * this function returns an object with the appropriate address type and details.
 *
 * @param {Object} addressInfo - The address information object to format.
 * @param {string} [addressInfo.host] - The host IP address (for TCP addresses).
 * @param {number} [addressInfo.port] - The port number (for TCP addresses).
 * @param {string} [addressInfo.path] - The file path (for UDS addresses).
 * @returns {Object} An object describing the formatted address, including its type and details.
 */
function formatSubchannelAddress(addressInfo) {
  // Check if the address is a TCP subchannel address using the external OB6 utility
  if (OB6.isTcpSubchannelAddress(addressInfo)) {
    // Attempt to extract the IP address using parseIpAddressToBuffer, fallback to undefined if not available
    const ipAddress = parseIpAddressToBuffer(addressInfo.host) !== null && parseIpAddressToBuffer(addressInfo.host) !== undefined
      ? parseIpAddressToBuffer(addressInfo.host)
      : undefined;
    return {
      address: "tcpip_address",
      tcpip_address: {
        ip_address: ipAddress,
        port: addressInfo.port
      }
    };
  } else {
    // If not a TCP address, treat as Unix Domain Socket address
    return {
      address: "uds_address",
      uds_address: {
        filename: addressInfo.path
      }
    };
  }
}

module.exports = formatSubchannelAddress;