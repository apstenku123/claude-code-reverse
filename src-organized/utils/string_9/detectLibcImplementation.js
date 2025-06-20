/**
 * Determines the libc implementation based on the provided string.
 *
 * @param {string} systemInfo - The string containing system information to inspect.
 * @returns {string|null} Returns the value of 'hd' if musl is detected, 'HO' if GNU C Library is detected, or null if neither is found.
 */
function detectLibcImplementation(systemInfo) {
  // Check if the system information string contains 'musl'
  if (systemInfo.includes("musl")) {
    return hd; // 'hd' should be defined elsewhere in the codebase
  }
  // Check if the system information string contains 'GNU C Library'
  if (systemInfo.includes("GNU C Library")) {
    return HO; // 'HO' should be defined elsewhere in the codebase
  }
  // Return null if neither implementation is detected
  return null;
}

module.exports = detectLibcImplementation;
