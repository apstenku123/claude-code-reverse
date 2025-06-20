/**
 * Checks if the current Node.js process is running on a Linux platform.
 *
 * @returns {boolean} Returns true if the platform is Linux, otherwise false.
 */
const isLinuxPlatform = () => {
  // process.platform returns a string identifying the operating system platform
  // 'linux' indicates the platform is Linux
  return process.platform === "linux";
};

module.exports = isLinuxPlatform;