/**
 * Parses the first gRPC configuration from a list of observables and processes isBlobOrFileLikeObject with a given config.
 *
 * Iterates through each subscription in the sourceObservable array, searching for a subscription
 * whose first element starts with 'grpc_config='. If found, isBlobOrFileLikeObject extracts the JSON configuration,
 * parses isBlobOrFileLikeObject, and passes isBlobOrFileLikeObject along with the provided config to the selectMatchingServiceConfig function.
 *
 * @param {Array<Array<string>>} sourceObservable - An array of subscriptions, each being an array of strings.
 * @param {Object} config - The configuration object to be passed to the selectMatchingServiceConfig function.
 * @returns {any|null} The result of selectMatchingServiceConfig if a gRPC config is found and parsed, otherwise null.
 */
function parseGrpcConfigFromObservable(sourceObservable, config) {
  for (const subscription of sourceObservable) {
    // Check if the subscription is non-empty and its first element starts with 'grpc_config='
    if (
      subscription.length > 0 &&
      subscription[0].startsWith("grpc_config=")
    ) {
      // Join all elements of the subscription into a single string and extract the JSON part
      const grpcConfigString = subscription.join("").substring(12);
      // Parse the JSON configuration
      const grpcConfig = JSON.parse(grpcConfigString);
      // Process the parsed configuration with the provided config
      return selectMatchingServiceConfig(grpcConfig, config);
    }
  }
  // Return null if no gRPC config is found
  return null;
}

module.exports = parseGrpcConfigFromObservable;