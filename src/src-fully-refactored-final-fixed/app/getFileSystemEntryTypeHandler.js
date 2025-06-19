/**
 * Determines the appropriate handler constant based on the type of a file system entry.
 *
 * @param {Object} fileSystemEntry - An object representing a file system entry (e.g., fs.Stats).
 * @returns {*} The handler constant corresponding to the entry type.
 *
 * The function checks the type of the file system entry using its methods in the following order:
 * - isFile
 * - isDirectory
 * - isSymbolicLink
 * - isCharacterDevice
 * - isBlockDevice
 * - isSocket
 * - isFIFO
 *
 * If none of these types match, a default handler is returned.
 */
const getFileSystemEntryTypeHandler = (fileSystemEntry) => {
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
  // Default handler if none of the above types match
  return uJ;
};

module.exports = getFileSystemEntryTypeHandler;
