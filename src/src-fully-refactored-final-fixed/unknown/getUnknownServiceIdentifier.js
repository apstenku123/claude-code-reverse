/**
 * Returns a string identifier for an unknown service, including the process executable path.
 *
 * @returns {string} a string in the format 'unknown_service:<processExecutablePath>'
 */
function getUnknownServiceIdentifier() {
  // process.argv0 contains the executable path used to start the Node.js process
  return `unknown_service:${process.argv0}`;
}

module.exports = getUnknownServiceIdentifier;