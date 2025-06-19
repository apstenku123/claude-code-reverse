/**
 * Throws an error indicating that proto loading is not available in this library.
 *
 * This function acts as a placeholder for proto loading functionality, which is not implemented here.
 * Users should use @grpc/proto-loader and loadPackageDefinition instead.
 *
 * @param {object} sourceObservable - The source observable or proto definition (unused).
 * @param {object} config - Configuration options for proto loading (unused).
 * @param {object} subscription - Subscription or context object (unused).
 * @throws {Error} Always throws an error to indicate this functionality is not available.
 */
const loadProtoNotAvailableError = (sourceObservable, config, subscription) => {
  // This function is intentionally not implemented.
  // It always throws an error to guide users to the correct library.
  throw new Error(
    "Not available in this library. Use @grpc/proto-loader and loadPackageDefinition instead"
  );
};

module.exports = loadProtoNotAvailableError;
