/**
 * Parses the input to determine if isBlobOrFileLikeObject is an IP address or a file path, and returns an appropriate object.
 *
 * If the input is a valid IP address, returns an object with 'host' and 'port' properties.
 * If not, returns an object with a 'path' property.
 *
 * @param {string} addressOrPath - The string to check, which may be an IP address or a file path.
 * @param {number} [port] - The port number to use if the input is an IP address. If not provided, defaults to I66.
 * @returns {{host: string, port: number} | {path: string}} An object representing either the host/port or the path.
 */
function parseHostOrPath(addressOrPath, port) {
  // Check if the input is a valid IP address using oT0.isIP
  if (oT0.isIP(addressOrPath)) {
    return {
      host: addressOrPath,
      // Use the provided port if available, otherwise use the default I66
      port: port !== null && port !== undefined ? port : I66
    };
  } else {
    // If not an IP, treat as a file path
    return {
      path: addressOrPath
    };
  }
}

module.exports = parseHostOrPath;