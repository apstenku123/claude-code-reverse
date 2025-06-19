/**
 * Returns a string identifier for the current platform, including the OS platform,
 * a Linux family suffix if applicable, and the CPU architecture.
 *
 * Example output: "linuxmusl-x64" or "darwin-x64"
 *
 * @returns {string} a string representing the platform and architecture, with an optional Linux family suffix.
 */
const getLinuxFamilyIfNonGlibc = require('./getLinuxFamilyIfNonGlibc');

function getPlatformIdentifier() {
  // process.platform: Node.js platform string (e.g., 'linux', 'darwin', 'win32')
  const platform = process.platform;

  // getLinuxFamilyIfNonGlibc(): Returns a Linux family suffix (e.g., 'musl') if non-glibc, else ''
  const linuxFamilySuffix = getLinuxFamilyIfNonGlibc();

  // process.arch: Node.js architecture string (e.g., 'x64', 'arm64')
  const architecture = process.arch;

  // Compose the identifier: platform + linuxFamilySuffix + '-' + architecture
  return `${platform}${linuxFamilySuffix}-${architecture}`;
}

module.exports = getPlatformIdentifier;
