/**
 * Throws an error indicating that loading gRPC packages is not supported in this library.
 *
 * This function acts as a placeholder for gRPC package loading functionality, which is not implemented.
 * Users are advised to use @grpc/proto-loader and loadPackageDefinition instead.
 *
 * @param {object} sourceObservable - The source observable or input object (not used).
 * @param {object} config - Configuration options for loading (not used).
 * @param {object} subscription - Subscription or context object (not used).
 * @throws {Error} Always throws an error indicating the operation is not supported.
 */
const loadGrpcPackageNotSupported = (sourceObservable, config, subscription) => {
  // This function is intentionally not implemented.
  // Users should use @grpc/proto-loader and loadPackageDefinition instead.
  throw new Error(
    "Not available in this library. Use @grpc/proto-loader and loadPackageDefinition instead"
  );
};

module.exports = loadGrpcPackageNotSupported;
