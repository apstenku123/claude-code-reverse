/**
 * Returns a unique identifier string for the current Node.js platform and architecture.
 * The identifier is composed of the platform name, a custom platform suffix, and the architecture name.
 *
 * @returns {string} a string in the format: '<platform><customSuffix>-<architecture>'
 */
const aK2 = require('./aK2'); // Import the custom platform suffix function

function getPlatformArchitectureIdentifier() {
  // Get the current operating system platform (e.g., 'darwin', 'win32', 'linux')
  const platform = process.platform;

  // Get the custom platform suffix from the aK2 function
  const customPlatformSuffix = aK2();

  // Get the current processor architecture (e.g., 'x64', 'arm')
  const architecture = process.arch;

  // Construct the identifier string
  return `${platform}${customPlatformSuffix}-${architecture}`;
}

module.exports = getPlatformArchitectureIdentifier;