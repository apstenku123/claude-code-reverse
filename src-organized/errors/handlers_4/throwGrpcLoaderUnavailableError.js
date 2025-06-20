/**
 * Throws an error indicating that the requested functionality is not available in this library.
 * Instructs the user to use @grpc/proto-loader and loadPackageDefinition instead.
 *
 * @param {any} sourceObservable - The source observable or input parameter (not used).
 * @param {any} config - The configuration object or input parameter (not used).
 * @throws {Error} Always throws an error to indicate unavailability of the feature.
 */
const throwGrpcLoaderUnavailableError = (sourceObservable, config) => {
  // This function is a placeholder and always throws an error.
  throw new Error(
    "Not available in this library. Use @grpc/proto-loader and loadPackageDefinition instead"
  );
};

module.exports = throwGrpcLoaderUnavailableError;
