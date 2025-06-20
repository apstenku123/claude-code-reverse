/**
 * Builds and applies an interceptor chain for a client or call, ensuring only one type of interceptor source is used.
 *
 * @param {Object} options - The options object containing interceptors and providers.
 * @param {Object} methodDefinition - The method definition for the current call.
 * @param {Object} callOptions - Additional call options to be merged.
 * @param {Function} callInvoker - The function to invoke the call at the end of the chain.
 * @returns {any} The result of the chained interceptors applied to the call options.
 *
 * @throws {zs} If both interceptors and interceptor providers are provided for client or call options.
 */
function buildInterceptorChain(options, methodDefinition, callOptions, callInvoker) {
  // Validate that only one source of interceptors is provided for client options
  if (
    options.clientInterceptors.length > 0 &&
    options.clientInterceptorProviders.length > 0
  ) {
    throw new zs(
      "Both interceptors and interceptor_providers were passed as options to the client constructor. Only one of these is allowed."
    );
  }

  // Validate that only one source of interceptors is provided for call options
  if (
    options.callInterceptors.length > 0 &&
    options.callInterceptorProviders.length > 0
  ) {
    throw new zs(
      "Both interceptors and interceptor_providers were passed as call options. Only one of these is allowed."
    );
  }

  let interceptors = [];

  // Choose interceptors from call or client scope, and resolve providers if present
  if (
    options.callInterceptors.length > 0 ||
    options.callInterceptorProviders.length > 0
  ) {
    // Use call-level interceptors and providers
    interceptors = [
      ...options.callInterceptors,
      ...options.callInterceptorProviders.map(provider => provider(methodDefinition))
    ].filter(Boolean); // Remove falsy values
  } else {
    // Use client-level interceptors and providers
    interceptors = [
      ...options.clientInterceptors,
      ...options.clientInterceptorProviders.map(provider => provider(methodDefinition))
    ].filter(Boolean); // Remove falsy values
  }

  // Merge callOptions with methodDefinition
  const mergedCallOptions = Object.assign({}, callOptions, {
    method_definition: methodDefinition
  });

  // Compose the interceptors into a single chain using reduceRight
  const chainedInterceptor = interceptors.reduceRight(
    (next, interceptor) => {
      // Each interceptor wraps the next in the chain
      return (finalOptions) => interceptor(finalOptions, next);
    },
    // The innermost function invokes the actual call
    (finalOptions) => createResponseStreamHandler(callInvoker, finalOptions, methodDefinition)
  );

  // Execute the composed chain
  return chainedInterceptor(mergedCallOptions);
}

module.exports = buildInterceptorChain;
