/**
 * Checks if the provided fileSystemEntity is a file, and if so, processes isBlobOrFileLikeObject using the given configuration.
 *
 * @param {Object} fileSystemEntity - An object representing a file system entity, expected to have an isFile() method.
 * @param {Object} processingConfig - Configuration object to be passed to the file processing function.
 * @returns {any} The result of the file processing function if fileSystemEntity is a file; otherwise, false.
 */
function processFileIfExists(fileSystemEntity, processingConfig) {
  // Check if the entity is a file before processing
  return fileSystemEntity.isFile() && hasPermissionForMode(fileSystemEntity, processingConfig);
}

module.exports = processFileIfExists;