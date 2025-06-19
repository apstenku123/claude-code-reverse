/**
 * Throws an error indicating that this functionality is not available in this library.
 * Suggests using @grpc/proto-loader and loadPackageDefinition instead.
 *
 * @param {any} sourceObservable - The source observable or input (not used).
 * @param {any} config - Configuration object or options (not used).
 * @param {any} subscription - Subscription or context (not used).
 * @throws {Error} Always throws an error to indicate unavailability.
 */
const throwGrpcProtoLoaderError = (sourceObservable, config, subscription) => {
  // This function is intentionally not implemented in this library.
  // Users are directed to use @grpc/proto-loader and loadPackageDefinition instead.
  throw new Error(
    "Not available in this library. Use @grpc/proto-loader and loadPackageDefinition instead"
  );
};

module.exports = throwGrpcProtoLoaderError;
