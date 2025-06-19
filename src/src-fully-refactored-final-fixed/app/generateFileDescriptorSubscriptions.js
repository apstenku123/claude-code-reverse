/**
 * Generates a mapping of subscription results for each entry in the source observable,
 * using provided configuration and encoded file descriptors.
 *
 * @param {Object} sourceObservable - The source object that provides descriptor and resolution methods.
 * @param {Object} config - Configuration object passed to the handleReflectionObject processing function.
 * @returns {Object} An object mapping descriptor keys to their processed subscription results.
 */
function generateFileDescriptorSubscriptions(sourceObservable, config) {
  const subscriptionResults = {};

  // Ensure all dependencies or references in the source are resolved
  sourceObservable.resolveAll();

  // Convert all proto3 file descriptors to encoded Buffer representations
  const encodedFileDescriptors = sourceObservable
    .toDescriptor("proto3")
    .file
    .map(fileDescriptor => Buffer.from(Ih1.FileDescriptorProto.encode(fileDescriptor).finish()));

  // Iterate over all entries produced by extractNestedObservables(likely a generator or iterable)
  for (const [descriptorKey, descriptorValue] of extractNestedObservables(sourceObservable, "")) {
    // Process each entry using handleReflectionObject, passing the value, key, config, and encoded descriptors
    subscriptionResults[descriptorKey] = handleReflectionObject(
      descriptorValue,
      descriptorKey,
      config,
      encodedFileDescriptors
    );
  }

  return subscriptionResults;
}

module.exports = generateFileDescriptorSubscriptions;