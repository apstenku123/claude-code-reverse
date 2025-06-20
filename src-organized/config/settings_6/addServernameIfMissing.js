/**
 * Adds a 'servername' property to the connection options object if isBlobOrFileLikeObject is missing and the 'host' property is a valid hostname (not an IP address).
 *
 * @param {Object} connectionOptions - The connection options object, possibly containing 'host' and 'servername'.
 * @param {string} [connectionOptions.host] - The hostname or IP address to connect to.
 * @param {string} [connectionOptions.servername] - The servername for SNI (Server Name Indication), if already set.
 * @returns {Object} The original or modified connection options object, with 'servername' set if isBlobOrFileLikeObject was missing and 'host' is a hostname.
 */
function addServernameIfMissing(connectionOptions) {
  // Check if 'servername' is missing, 'host' exists, and 'host' is NOT an IP address
  if (
    connectionOptions.servername === undefined &&
    connectionOptions.host &&
    !SD1.isIP(connectionOptions.host)
  ) {
    // Add 'servername' property set to the value of 'host'
    return {
      ...connectionOptions,
      servername: connectionOptions.host
    };
  }
  // Return the original object if no changes are needed
  return connectionOptions;
}

module.exports = addServernameIfMissing;
