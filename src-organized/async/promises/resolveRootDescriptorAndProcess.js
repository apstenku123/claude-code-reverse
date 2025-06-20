/**
 * Resolves all dependencies for a given root descriptor and processes isBlobOrFileLikeObject with the provided configuration.
 *
 * @param {object} rootDescriptor - The root descriptor object to be resolved (typically a protobuf descriptor).
 * @param {object} [config={}] - Optional configuration object for processing the resolved descriptor.
 * @returns {any} The result of processing the resolved root descriptor with the given configuration.
 */
function resolveRootDescriptorAndProcess(rootDescriptor, config = {}) {
  // Create a Root instance from the descriptor
  const rootInstance = tz.Root.fromDescriptor(rootDescriptor);

  // Resolve all type references and dependencies in the root instance
  rootInstance.resolveAll();

  // Process the resolved root instance with the provided configuration
  return gZ1(rootInstance, config);
}

module.exports = resolveRootDescriptorAndProcess;