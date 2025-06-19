/**
 * Determines the appropriate handler for a given file system entity based on its type.
 *
 * @param {Object} fileSystemEntity - An object representing a file system entity (e.g., file, directory, symlink, etc.).
 *   Must implement methods: isFile(), isDirectory(), isSymbolicLink(), isCharacterDevice(),
 *   isBlockDevice(), isSocket(), isFIFO().
 * @returns {Function} The handler function corresponding to the entity type.
 *
 * The handlers (qHA, Az, gP, NHA, $getComponentStackFrame, MHA, UHA, uJ) must be defined/imported elsewhere.
 */
const getFileSystemEntityTypeHandler = (fileSystemEntity) => {
  // Check if the entity is a regular file
  if (fileSystemEntity.isFile()) {
    return qHA;
  }
  // Check if the entity is a directory
  if (fileSystemEntity.isDirectory()) {
    return Az;
  }
  // Check if the entity is a symbolic link
  if (fileSystemEntity.isSymbolicLink()) {
    return gP;
  }
  // Check if the entity is a character device
  if (fileSystemEntity.isCharacterDevice()) {
    return NHA;
  }
  // Check if the entity is a block device
  if (fileSystemEntity.isBlockDevice()) {
    return $getComponentStackFrame;
  }
  // Check if the entity is a socket
  if (fileSystemEntity.isSocket()) {
    return MHA;
  }
  // Check if the entity is a FIFO (named pipe)
  if (fileSystemEntity.isFIFO()) {
    return UHA;
  }
  // Default handler if none of the above types match
  return uJ;
};

module.exports = getFileSystemEntityTypeHandler;
