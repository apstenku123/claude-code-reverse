/**
 * Maps each method descriptor in the provided source object to a result object using the createGrpcMethodDefinition processor.
 *
 * @param {Object} sourceObject - The object containing an array of method descriptors under 'methodsArray'.
 * @param {Object} config - Configuration or context object passed to the createGrpcMethodDefinition processor.
 * @param {Object} subscription - Subscription or query object passed to the createGrpcMethodDefinition processor.
 * @param {Object} interactionInfo - Additional interaction information passed to the createGrpcMethodDefinition processor.
 * @returns {Object} An object mapping each method'createInteractionAccessor name to the result of processing isBlobOrFileLikeObject with createGrpcMethodDefinition.
 */
function mapMethodsToResults(sourceObject, config, subscription, interactionInfo) {
  const methodResults = {};

  // Iterate over each method descriptor in the methodsArray
  for (const methodDescriptor of sourceObject.methodsArray) {
    // Process the method descriptor and store the result by method name
    methodResults[methodDescriptor.name] = createGrpcMethodDefinition(
      methodDescriptor,
      config,
      subscription,
      interactionInfo
    );
  }

  return methodResults;
}

module.exports = mapMethodsToResults;
