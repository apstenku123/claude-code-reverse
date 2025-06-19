/**
 * Determines the type of a file system entry and returns the corresponding constant.
 *
 * @param {Object} fileSystemEntry - An object representing a file system entry, expected to have methods such as isFile(), isDirectory(), etc.
 * @returns {any} - Returns a specific constant based on the type of the file system entry.
 */
function getFileSystemEntryTypeConstant(fileSystemEntry) {
  // Check if the entry is a regular file
  if (fileSystemEntry.isFile()) {
    return qHA;
  }
  // Check if the entry is a directory
  if (fileSystemEntry.isDirectory()) {
    return Az;
  }
  // Check if the entry is a symbolic link
  if (fileSystemEntry.isSymbolicLink()) {
    return gP;
  }
  // Check if the entry is a character device
  if (fileSystemEntry.isCharacterDevice()) {
    return NHA;
  }
  // Check if the entry is a block device
  if (fileSystemEntry.isBlockDevice()) {
    return $getComponentStackFrame;
  }
  // Check if the entry is a socket
  if (fileSystemEntry.isSocket()) {
    return MHA;
  }
  // Check if the entry is a FIFO (named pipe)
  if (fileSystemEntry.isFIFO()) {
    return UHA;
  }
  // Default case: unknown or unsupported type
  return uJ;
}

module.exports = getFileSystemEntryTypeConstant;
