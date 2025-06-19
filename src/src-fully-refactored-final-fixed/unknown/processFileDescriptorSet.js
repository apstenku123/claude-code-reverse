/**
 * Processes a FileDescriptorSet object and applies a transformation using the provided options.
 *
 * @param {Object} fileDescriptorSetObject - The plain object representing a FileDescriptorSet.
 * @param {Object} options - Options or configuration to be passed to the transformation function.
 * @returns {any} The result of processing the FileDescriptorSet with the given options.
 */
function processFileDescriptorSet(fileDescriptorSetObject, options) {
  // Convert the plain object into a FileDescriptorSet instance
  const fileDescriptorSetInstance = Ih1.FileDescriptorSet.fromObject(fileDescriptorSetObject);
  // Process the FileDescriptorSet instance with the provided options
  return b_0(fileDescriptorSetInstance, options);
}

module.exports = processFileDescriptorSet;