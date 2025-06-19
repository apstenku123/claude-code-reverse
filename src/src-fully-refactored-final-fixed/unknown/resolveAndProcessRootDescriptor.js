/**
 * Resolves all dependencies in a root descriptor and processes isBlobOrFileLikeObject with the provided configuration.
 *
 * @param {object} rootDescriptor - The root descriptor object to be resolved and processed.
 * @param {object} [config={}] - Optional configuration object for processing the resolved root descriptor.
 * @returns {any} The result of processing the resolved root descriptor with the given configuration.
 */
function resolveAndProcessRootDescriptor(rootDescriptor, config = {}) {
  // Create a root subscription from the descriptor
  const subscription = tz.Root.fromDescriptor(rootDescriptor);

  // Resolve all dependencies or references in the subscription
  subscription.resolveAll();

  // Process the resolved subscription with the provided configuration
  return gZ1(subscription, config);
}

module.exports = resolveAndProcessRootDescriptor;