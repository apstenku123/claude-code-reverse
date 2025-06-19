/**
 * Generates a mapping of descriptor subscriptions from a source observable and configuration.
 *
 * This function resolves all dependencies in the source observable, encodes its proto3 descriptors,
 * and then iterates over all entries produced by extractNestedObservables. For each entry, isBlobOrFileLikeObject creates a subscription
 * using the handleReflectionObject function, passing in the descriptor, its name, the configuration, and the encoded descriptors.
 *
 * @param {Object} sourceObservable - The source object providing resolveAll and toDescriptor methods.
 * @param {Object} config - Configuration object to be passed to the subscription generator.
 * @returns {Object} a mapping from descriptor names to their corresponding subscriptions.
 */
function generateDescriptorSubscriptions(sourceObservable, config) {
  const subscriptions = {};
  // Ensure all dependencies in the source observable are resolved
  sourceObservable.resolveAll();

  // Convert proto3 descriptors to encoded buffer representations
  const encodedDescriptors = sourceObservable
    .toDescriptor("proto3")
    .file
    .map(descriptor => Buffer.from(Ih1.FileDescriptorProto.encode(descriptor).finish()));

  // Iterate over all descriptor entries and generate subscriptions
  for (const [descriptorName, descriptorValue] of extractNestedObservables(sourceObservable, "")) {
    subscriptions[descriptorName] = handleReflectionObject(
      descriptorValue,
      descriptorName,
      config,
      encodedDescriptors
    );
  }

  return subscriptions;
}

module.exports = generateDescriptorSubscriptions;