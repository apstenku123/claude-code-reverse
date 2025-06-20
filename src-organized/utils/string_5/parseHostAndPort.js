/**
 * Parses a host (and optional port) from a string, supporting IPv6 and IPv4/hostname formats.
 *
 * @param {string} address - The address string to parse. Can be IPv6 in brackets (e.g., "[::1]:8080") or IPv4/hostname (e.g., "localhost:3000").
 * @returns {object|null} An object with 'host' and optional 'port' properties, or null if parsing fails.
 */
function parseHostAndPort(address) {
  // Check if the address starts with '[' indicating an IPv6 address
  if (address.startsWith("[")) {
    const closingBracketIndex = address.indexOf("]");
    if (closingBracketIndex === -1) return null; // Malformed IPv6 address

    const host = address.substring(1, closingBracketIndex);
    // Ensure IPv6 address contains a colon (':')
    if (host.indexOf(":") === -1) return null;

    // Check if there is a port specified after the closing bracket
    if (address.length > closingBracketIndex + 1) {
      // Port must be prefixed by a colon
      if (address[closingBracketIndex + 1] === ":") {
        const portString = address.substring(closingBracketIndex + 2);
        // Validate port using ET0 regex (assumed to be defined elsewhere)
        if (ET0.test(portString)) {
          return {
            host: host,
            port: +portString
          };
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      // No port specified, return only host
      return {
        host: host
      };
    }
  } else {
    // Handle IPv4 or hostname (e.g., "localhost:3000")
    const parts = address.split(":");
    if (parts.length === 2) {
      const [host, portString] = parts;
      // Validate port using ET0 regex (assumed to be defined elsewhere)
      if (ET0.test(portString)) {
        return {
          host: host,
          port: +portString
        };
      } else {
        return null;
      }
    } else {
      // No port specified, return only host
      return {
        host: address
      };
    }
  }
}

module.exports = parseHostAndPort;