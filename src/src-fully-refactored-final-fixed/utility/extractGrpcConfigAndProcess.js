/**
 * Searches through an array of subscription arrays to find and process a gRPC configuration.
 *
 * Iterates over each subscription array in the sourceObservable. If a subscription array is non-empty and its first element
 * starts with the string "grpc_config=", isBlobOrFileLikeObject extracts the JSON configuration string, parses isBlobOrFileLikeObject, and passes the resulting object
 * along with the provided config to the selectMatchingServiceConfig function. If no such subscription is found, returns null.
 *
 * @param {Array<Array<string>>} sourceObservable - An array of subscription arrays, each containing string entries.
 * @param {object} config - The configuration object to be passed to the selectMatchingServiceConfig function.
 * @returns {any|null} The result of selectMatchingServiceConfig if a gRPC config is found and processed; otherwise, null.
 */
function extractGrpcConfigAndProcess(sourceObservable, config) {
  for (const subscription of sourceObservable) {
    // Check if the subscription array is non-empty and its first element starts with 'grpc_config='
    if (subscription.length > 0 && subscription[0].startsWith("grpc_config=")) {
      // Join all elements into a single string and extract the JSON part after 'grpc_config='
      const grpcConfigString = subscription.join("").substring(12);
      // Parse the JSON configuration
      const grpcConfigObject = JSON.parse(grpcConfigString);
      // Process the configuration using the external selectMatchingServiceConfig function
      return selectMatchingServiceConfig(grpcConfigObject, config);
    }
  }
  // Return null if no matching subscription is found
  return null;
}

module.exports = extractGrpcConfigAndProcess;