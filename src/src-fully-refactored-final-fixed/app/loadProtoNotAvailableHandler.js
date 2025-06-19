/**
 * Throws an error indicating that proto loading is not available in this library.
 *
 * This function serves as a placeholder for proto loading functionality, which is not implemented in this library.
 * Users are advised to use @grpc/proto-loader and loadPackageDefinition instead.
 *
 * @param {object} sourceObservable - The observable source (not used).
 * @param {object} config - Configuration object (not used).
 * @param {object} subscription - Subscription object (not used).
 * @throws {Error} Always throws an error indicating the feature is unavailable.
 */
const loadProtoNotAvailableHandler = (sourceObservable, config, subscription) => {
  // This function is intentionally not implemented.
  // It always throws an error to inform users to use the recommended alternative.
  throw new Error(
    "Not available in this library. Use @grpc/proto-loader and loadPackageDefinition instead"
  );
};

module.exports = loadProtoNotAvailableHandler;
