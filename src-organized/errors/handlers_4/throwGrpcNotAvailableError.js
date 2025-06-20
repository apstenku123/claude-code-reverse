/**
 * Throws an error indicating that the requested gRPC functionality is not available in this library.
 * Suggests using @grpc/proto-loader and loadPackageDefinition instead.
 *
 * @param {any} sourceObservable - The source observable or input that triggered this function.
 * @param {any} config - Configuration object or options related to the gRPC operation.
 * @throws {Error} Always throws an error to indicate unsupported functionality.
 */
const throwGrpcNotAvailableError = (sourceObservable, config) => {
  // This function is intentionally not implemented in this library.
  // Users should use @grpc/proto-loader and loadPackageDefinition instead.
  throw new Error(
    "Not available in this library. Use @grpc/proto-loader and loadPackageDefinition instead"
  );
};

module.exports = throwGrpcNotAvailableError;
