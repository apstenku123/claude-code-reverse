/**
 * Determines if the given file descriptor is in read mode and does not have the specified flag set.
 *
 * @param {Object} fileDescriptor - The file descriptor object to check.
 * @param {number} fileDescriptor.mode - Bitmask representing the mode (e.g., read/write).
 * @param {number} fileDescriptor.flags - Bitmask representing various flags.
 * @returns {boolean} True if the file descriptor is in read mode and the specific flag (128) is not set; otherwise, false.
 */
function isReadModeWithoutFlag(fileDescriptor) {
  // Check if the least significant bit of mode is set (read mode)
  const isReadMode = (fileDescriptor.mode & 1) !== 0;
  // Check if the 128 flag is NOT set in flags
  const isFlag128NotSet = (fileDescriptor.flags & 128) === 0;
  // Return true only if both conditions are met
  return isReadMode && isFlag128NotSet;
}

module.exports = isReadModeWithoutFlag;